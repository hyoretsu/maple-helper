import { SlashCommandBuilder } from "discord.js";
import { Command } from "../@types";

const hmutoCommand: Command = {
	data: new SlashCommandBuilder().setName("hmuto_guide").setDescription("Material guide for HMuto."),
	async execute(interaction) {
		await interaction.reply({
			content:
				"Materials/directions:\nhttps://media.discordapp.net/attachments/1175486649904414780/1176010232615424000/image.png",
			ephemeral: true,
		});
	},
};

export default hmutoCommand;
