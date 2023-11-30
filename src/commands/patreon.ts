import { SlashCommandBuilder } from "discord.js";
import { Command } from "../@types";

const patreonCommand: Command = {
	data: new SlashCommandBuilder()
		.setName("patreon")
		.setDescription("In case you really liked my bot and want to support me."),
	async execute(interaction) {
		await interaction.reply({
			content: "Here you are! Thanks in advance.\nhttps://www.patreon.com/hyoretsu",
			ephemeral: true,
		});
	},
};

export default patreonCommand;
