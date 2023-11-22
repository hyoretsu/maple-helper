import { CategoryChannel, ChannelType, SlashCommandBuilder, TextChannel, User } from "discord.js";
import { Command } from "../@types";
import { prisma } from "../database";
import { Character } from "@prisma/client";
import { baNames, baTypes, baUnits, generateBaText } from "./ba";

const partyCommand: Command = {
	data: new SlashCommandBuilder()
		.setName("party")
		.setDescription("Party-related commands")
		.addSubcommand(subcommand =>
			subcommand
				.setName("ba")
				.setDescription("View all the BAs of a party")
				.addStringOption(option =>
					option.setName("name").setDescription("The name of the party.").setRequired(true),
				)
				.addStringOption(option =>
					option
						.setName("character")
						.setDescription(
							"A character from the party you're looking for (in case there's more than 1 with the same name).",
						),
				)
				.addStringOption(option =>
					option
						.setName("user")
						.setDescription(
							"A member of the party you're looking for (in case there's more than 1 with the same name).",
						),
				),
		)
		.addSubcommand(subcommand =>
			subcommand
				.setName("create")
				.setDescription("Create a new party")
				.addStringOption(option =>
					option.setName("name").setDescription("The name of the party.").setRequired(true),
				)
				.addStringOption(option =>
					option.setName("character1").setDescription("The 1st character of the party.").setRequired(true),
				)
				.addStringOption(option =>
					option.setName("character2").setDescription("The 2nd character of the party.").setRequired(true),
				)
				.addStringOption(option =>
					option.setName("character3").setDescription("The 3rd character of the party."),
				)
				.addStringOption(option =>
					option.setName("character4").setDescription("The 4th character of the party."),
				)
				.addStringOption(option =>
					option.setName("character5").setDescription("The 5th character of the party."),
				)
				.addStringOption(option =>
					option.setName("character6").setDescription("The 6th character of the party."),
				)
				.addUserOption(option => option.setName("user1").setDescription("The 1st member of the party."))
				.addUserOption(option => option.setName("user2").setDescription("The 2nd member of the party."))
				.addUserOption(option => option.setName("user3").setDescription("The 3rd member of the party."))
				.addUserOption(option => option.setName("user4").setDescription("The 4th member of the party."))
				.addUserOption(option => option.setName("user5").setDescription("The 5th member of the party."))
				.addUserOption(option => option.setName("user6").setDescription("The 6th member of the party."))
				.addRoleOption(option =>
					option
						.setName("role")
						.setDescription("In case you already have an existing role for party members."),
				),
		),
	async execute(interaction) {
		switch (interaction.options.getSubcommand()) {
			case "ba": {
				const partyName = interaction.options.getString("name") as string;
				const nickname = interaction.options.getString("character");
				const user = interaction.options.getUser("user");

				const userId = user?.id || interaction.user.id;
				const username = user?.username || interaction.user.username;

				const parties = await prisma.party.findMany({
					where: {
						name: partyName,
					},
					include: {
						members: {
							include: {
								bas: true,
							},
							orderBy: {
								nickname: "asc",
							},
						},
					},
				});
				if (parties.length === 0) {
					await interaction.reply({
						content:
							"It seems the party you're looking for doesn't exist in our database yet or you made a spelling mistake. Please try again.",
						ephemeral: true,
					});

					return;
				}

				let party: typeof parties[0] | undefined = parties[0];

				if (parties.length > 1 && user?.id) {
					party = parties.find(party => party.members.find(member => member.userId === userId));

					if (!party) {
						await interaction.reply({
							content: "The user you sent is not part of the selected party.",
							ephemeral: true,
						});

						return;
					}
				}

				// Only viewing (if non-null given ba's length is 0)
				if (party.members.map(member => member.bas).filter(ba => ba).length === 0) {
					await interaction.reply({
						content: "Your party hasn't registered any BA's yet.",
						ephemeral: true,
					});

					return;
				}

				await interaction.reply({
					content: `${partyName} BAs:${party.members.reduce((str, partyMember) => {
						return `${str}\n- ${partyMember.nickname}${generateBaText(partyMember.bas) || "\nNone registered."}`;
					}, "")}`,
				});

				return;
			}
			case "create": {
				const partyName = interaction.options.getString("name") as string;
				const characters = [
					interaction.options.getString("character1"),
					interaction.options.getString("character2"),
					interaction.options.getString("character3"),
					interaction.options.getString("character4"),
					interaction.options.getString("character5"),
					interaction.options.getString("character6"),
				] as Array<string | null>;
				const users = [
					interaction.options.getUser("user1"),
					interaction.options.getUser("user2"),
					interaction.options.getUser("user3"),
					interaction.options.getUser("user4"),
					interaction.options.getUser("user5"),
					interaction.options.getUser("user6"),
				] as Array<User | null>;

				const existingParty = await prisma.party.findFirst({
					where: {
						members: {
							every: {
								id: {
									in: users.reduce((arr, user) => {
										if (!user) {
											return arr;
										}

										arr.push(user.id);
										return arr;
									}, [] as string[]),
								},
							},
						},
						name: partyName,
					},
				});
				if (existingParty) {
					await interaction.reply({
						content: "This party already exists.",
						ephemeral: true,
					});

					return;
				}

				// Create role
				let role = interaction.options.getRole("role");
				if (!role) {
					role =
						interaction.guild!.roles.cache.find(role => role.name === partyName) ||
						(await interaction.guild!.roles.create({
							name: partyName,
							permissions: ["MoveMembers"],
						}));

					for (const user of users) {
						if (!user) {
							continue;
						}

						interaction.guild!.members.cache.get(user.id)!.roles.add(role.id);
					}
				}

				// Find characters
				const existingCharacters: Array<Character | null> = [];
				for (const [i, nickname] of characters.entries()) {
					if (!nickname) {
						existingCharacters[i] = null;
						continue;
					}

					existingCharacters[i] = await prisma.character.findFirst({
						where: {
							nickname,
							...(users[i] && { userId: users[i]!.id }),
						},
					});
				}

				// Check if users already exist or create them
				for (const [i, character] of existingCharacters.entries()) {
					if (character) {
						continue;
					} else {
						if (!users[i]) {
							if (!existingCharacters[i] && characters[i]) {
								await interaction.reply({
									content: `You're including the character ${characters[i]}, which hasn't been registered before, but didn't include its user. Please try again.`,
									ephemeral: true,
								});

								return;
							}

							continue;
						}

						// Create unregistered characters
						existingCharacters[i] = await prisma.character.create({
							data: {
								nickname: characters[i] as string,
								userId: users[i]!.id,
							},
						});
					}

					const { id, username } = users[i] as User;

					const user = await prisma.user.findUnique({
						where: { id },
					});

					if (!user && users[i]) {
						await prisma.user.create({
							data: {
								id,
								username,
							},
						});
					}
				}

				// Create the party's channels
				let category = interaction.guild!.channels.cache.find(
					channel => channel instanceof CategoryChannel && channel.name === partyName,
				) as CategoryChannel | null;
				const everyoneRole = interaction.guild!.roles.everyone;
				let rotationChannel: TextChannel;

				if (!category) {
					category = await interaction.guild!.channels.create({
						name: partyName,
						type: ChannelType.GuildCategory,
						position: 0,
						permissionOverwrites: [
							{
								id: everyoneRole.id,
								deny: ["ViewChannel"],
							},
							{
								id: role.id,
								allow: ["ViewChannel"],
							},
						],
					});

					await category.children.create({
						name: "party-chat",
						type: ChannelType.GuildText,
					});

					rotationChannel = await category.children.create({
						name: "rotation",
						type: ChannelType.GuildText,
					});

					await category.children.create({
						name: "boss",
						type: ChannelType.GuildVoice,
					});
				} else {
					const partyChatChannel = category.children.cache.find(channel => channel.name === "party-chat");
					if (!partyChatChannel) {
						await category.children.create({
							name: "party-chat",
							type: ChannelType.GuildText,
						});
					}

					rotationChannel = category.children.cache.find(
						channel => channel.name === "rotation",
					) as TextChannel;
					if (!rotationChannel) {
						rotationChannel = await category.children.create({
							name: "rotation",
							type: ChannelType.GuildText,
						});
					}

					const voiceChannel = category.children.cache.find(channel => channel.name === "boss");
					if (!voiceChannel) {
						await category.children.create({
							name: "boss",
							type: ChannelType.GuildVoice,
						});
					}
				}

				// Create the party
				await prisma.party.create({
					data: {
						channelId: rotationChannel.id,
						members: {
							connect: existingCharacters.map(character => ({ id: character!.id })),
						},
						name: partyName,
						roleId: role.id,
					},
				});

				await interaction.reply({
					content: `The party \`${partyName}\` was successfully created!`,
					ephemeral: true,
				});

				return;
			}
		}
	},
};

export default partyCommand;
