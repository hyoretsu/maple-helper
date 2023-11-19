import { SlashCommandBuilder, User } from "discord.js";
import { Command } from "../@types";
import { prisma } from "../main";

const commerciCommand: Command = {
	data: new SlashCommandBuilder()
		.setName("party")
		.setDescription("Party-related commands")
		.addSubcommand(subcommand =>
			subcommand
				.setName("create")
				.setDescription("Create a new party")
				.addStringOption(option =>
					option.setName("name").setDescription("The name of the party").setRequired(true),
				)
				.addUserOption(option =>
					option.setName("member1").setDescription("The 1st member of the party").setRequired(true),
				)
				.addUserOption(option =>
					option.setName("member2").setDescription("The 2nd member of the party").setRequired(true),
				)
				.addUserOption(option => option.setName("member3").setDescription("The 3rd member of the party"))
				.addUserOption(option => option.setName("member4").setDescription("The 4th member of the party"))
				.addUserOption(option => option.setName("member5").setDescription("The 5th member of the party"))
				.addUserOption(option => option.setName("member6").setDescription("The 6th member of the party"))
				.addRoleOption(option =>
					option
						.setName("role")
						.setDescription("In case you already have an existing role for party members"),
				),
		),
	async execute(interaction) {
		switch (interaction.options.getSubcommand()) {
			case "create": {
				const members = [
					interaction.options.getUser("member1"),
					interaction.options.getUser("member2"),
					interaction.options.getUser("member3"),
					interaction.options.getUser("member4"),
					interaction.options.getUser("member5"),
					interaction.options.getUser("member6"),
				] as User[];
				const name = interaction.options.getString("name") as string;

				const existingParty = await prisma.party.findFirst({
					where: {
						members: {
							every: {
								id: { in: members.map(member => member.id) },
							},
						},
						name,
					},
				});
				if (existingParty) {
					await interaction.reply({
						content: "This party already exists.",
						ephemeral: true,
					});

					return;
				}

				let role = interaction.options.getRole("role");
				if (!role) {
					role = await interaction.guild!.roles.create({
						name,
					});
				}

				await prisma.party.create({
					data: {
						members: {
							create: members.map(({ id, username }) => ({ id, username })),
						},
						name,
						roleId: role.id,
					},
				});

				await interaction.reply({
					content: `The party \`${name}\` was successfully created!`,
					ephemeral: true,
				});

				return;
			}
		}
	},
};

export default commerciCommand;
