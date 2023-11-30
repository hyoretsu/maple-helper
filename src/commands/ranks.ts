import { SlashCommandBuilder } from "discord.js";
import { Command } from "../@types";

const supportCommand: Command = {
	data: new SlashCommandBuilder().setName("ranks").setDescription("Get a character's profile."),
	async execute(interaction) {
		await interaction.reply({
			content:
				"I don't want to rip off his work just to make my bot more complete, so [here](https://mapleranks.com)'s the link to their site or, if you prefer, the [invite link](https://discord.com/api/oauth2/authorize?client_id=895756174891302962&permissions=8&scope=bot%20applications.commands) to their bot.",
			ephemeral: true,
		});
	},
};

export default supportCommand;
