import { SlashCommandBuilder } from "discord.js";
import { Command } from "../@types";

const phantomForestMapCommand: Command = {
	data: new SlashCommandBuilder()
		.setName("phantom_forest_map")
		.setDescription("Easy-to-follow Phantom Forest map."),
	async execute(interaction) {
		await interaction.reply({
			content:
				"https://media.discordapp.net/attachments/1175486649904414780/1176002233146540092/phantom_forest_cheat_sheet.png",
			ephemeral: true,
		});
	},
};

export default phantomForestMapCommand;
