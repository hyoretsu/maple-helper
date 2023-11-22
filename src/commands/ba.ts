import { SlashCommandBuilder } from "discord.js";
import { Command } from "../@types";
import { prisma } from "../database";
import { BattleAnalysis } from "@prisma/client";

export const baNames = ["Black Mage", "Full rotation", "HLucid"];
export const baTypes = ["bm", "full_rotation", "hlucid"];
export const baUnits = ["b/s", "b/s", "T"];

export const generateBaText = (bas: BattleAnalysis[], bulletedList = false) => {
	bas.sort((a, b) => baTypes.findIndex(type => type === a.type) - baTypes.findIndex(type => type === b.type));

	return bas.reduce((str, ba, index) => {
		// switch (index) {
		// 	// BM and full rotation
		// 	case 0:
		// 	case 1:
		// 		ba.value /= 1000000000;
		// 		break;
		// 	// HLucid
		// 	case 2:
		// 		ba.value /= 1000000000000;
		// 		break;
		// }

		return `${str}\n${bulletedList ? "- " : ""}${baNames[index]} - ${ba.value.toFixed(2)}${baUnits[index]}${ba.link ? ` ([Screenshot](${ba.link}))` : ""}`;
	}, "");
};

const partyCommand: Command = {
	data: new SlashCommandBuilder()
		.setName("ba")
		.setDescription("Update or view your BAs.")
		.addSubcommand(option => option.setName("help").setDescription("Instructions for each type of BA."))
		.addSubcommand(option =>
			option
				.setName("show")
				.setDescription("View your BAs.")
				.addStringOption(option =>
					option
						.setName("character")
						.setDescription("The charater you're looking to search BAs for.")
						.setRequired(true),
				),
		)
		.addSubcommand(option =>
			option
				.setName("update")
				.setDescription("Update your or your party members's BAs.")
				.addStringOption(option =>
					option
						.setName("character")
						.setDescription("The charater that'll have their BAs updated.")
						.setRequired(true),
				)
				.addStringOption(option =>
					option
						.setName("type")
						.setDescription("The type of BA you're looking to update.")
						.addChoices(
							{ name: "Black Mage", value: "bm" },
							{ name: "Full rotation", value: "full_rotation" },
							{ name: "Hard Lucid", value: "hlucid" },
						)
						.setRequired(true),
				)
				.addNumberOption(option =>
					option
						.setName("value")
						.setDescription(
							"Your BA total, in b/s or T. Refer to '/ba help' for instructions on each type of BA.",
						),
				)
				.addStringOption(option =>
					option
						.setName("screenshot")
						.setDescription(
							"A (permament) link to your BA screenshot, in case you also want to safekeep it.",
						),
				),
		),
	async execute(interaction) {
		switch (interaction.options.getSubcommand()) {
			case "help": {
				await interaction.reply({
					content:
						"Instructions:\n- **Black Mage**: Same as full rotation, but locked at lv275. You may set AF to 1320, but it won't change anything.\n- **Full rotation**: Your BA, from one burst to the other. Same level, high def (300), no AF/SAC, elemental reduction dummy. Measured in b/s.\n- **Hard Lucid**: Your BA in exactly 40s. Lv230, high def (300), 320 SAC, elemental reduction dummy. Fully setup before starting.",
					ephemeral: true,
				});

				return;
			}
			case "show": {
				const nickname = interaction.options.getString("character");

				const bas = await prisma.battleAnalysis.findMany({
					where: {
						character: {
							nickname,
						},
					},
				});

				await interaction.reply({
					content: `Here are \`${nickname}\`'s BAs:${generateBaText(bas, true)}`,
					ephemeral: true,
				});

				return;
			}
			case "update": {
				const nickname = interaction.options.getString("character") as string;

				const value = interaction.options.getNumber("value");
				let screenshot = interaction.options.getString("screenshot");

				if (!value && !screenshot) {
					await interaction.reply({
						content: "You need to send either a BA or a screenshot link to update/create an entry.",
						ephemeral: true,
					});

					return;
				}

				if (value && value % 1 === 0) {
					await interaction.reply({
						content:
							'Please send "formatted" BAs (floating point numbers, in b/s or T, at whatever precision you like).',
						ephemeral: true,
					});

					return;
				}

				// Treat Discord links's junk
				if (screenshot && screenshot.search("discordapp") >= 0) {
					screenshot = screenshot.replace(/\?.*/, "");
				}

				const { id: userId, username: memberUsername } = interaction.user;

				const character = await prisma.character.findFirst({
					where: {
						...(nickname ? { nickname } : { userId }),
					},
				});
				if (!character) {
					await interaction.reply({
						content: "The character you sent does not exist or its name was misspelled. Please try again.",
						ephemeral: true,
					});

					return;
				}

				if (character.userId !== userId) {
					const party = await prisma.party.findFirst({
						where: {
							AND: [
								{
									members: {
										some: { nickname },
									},
								},
								{
									members: {
										some: { userId },
									},
								},
							],
						},
					});

					if (!party) {
						await interaction.reply({
							content: "For security purposes, you cannot update a BA from a party you're not a part of.",
							ephemeral: true,
						});

						return;
					}
				}

				const type = interaction.options.getString("type") as string;

				// Check for an existing BA from that user in that party
				const existingBa = await prisma.battleAnalysis.findFirst({
					where: {
						characterId: character.id,
						type,
					},
				});

				// If the user sent a link, isn't updating a BA and hasn't sent a BA value (tryinbg to create with only a link)
				if (screenshot && !existingBa && !value) {
					await interaction.reply({
						content:
							"You cannot create a BA entry with only a screenshot for utility purposes. Please try again.",
						ephemeral: true,
					});

					return;
				}

				const newBas: Array<BattleAnalysis | null> = [];

				// Update BA's
				if (existingBa) {
					await prisma.battleAnalysis.update({
						data: {
							...(value ? { value } : { link: screenshot }),
						},
						where: {
							id: existingBa.id,
						},
						include: {
							character: true,
						},
					});
				} else {
					if (!value) {
						await interaction.reply({
							content:
								"For utility purposes, you cannot register a BA for the first time without providing its value. Please try again.",
							ephemeral: true,
						});

						return;
					}

					// Create BA's
					await prisma.battleAnalysis.create({
						data: {
							characterId: character.id,
							link: screenshot,
							type,
							value,
						},
						include: {
							character: true,
						},
					});
				}

				await interaction.reply({
					content: `\`${`${nickname}'s` || "Your"}\` BA has been successfully updated/created!`,
				});

				return;
			}
		}
	},
};

export default partyCommand;
