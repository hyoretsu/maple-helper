import { Command } from "@types";
import servers from "../data/servers.json";
import { SlashCommandBuilder } from "discord.js";

const createPartyCommand: Command = {
	data: new SlashCommandBuilder()
		.setName("class_server")
		.setDescription("Easy-to-get link for any class server. (Contact the developer for missing/broken links)")
		.addStringOption(option =>
			option
				.setName("class")
				.setDescription("You'll get the link for this class's Discord server.")
				.setRequired(true),
		),
	async execute(interaction) {
		const chosenClass = interaction.options.getString("class") as string;

		// @ts-ignore
		const serverLink = servers[chosenClass];

		if (!serverLink) {
			await interaction.reply({
				content:
					"The class you requested either doesn't exist in our database or has a wrong spelling. Please try again or contact the developer.",
				ephemeral: true,
			});

			return;
		}

		await interaction.reply({
			content: `Here is the link to your server: ${serverLink}`,
			ephemeral: true,
		});
	},
};

export default createPartyCommand;
