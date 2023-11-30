import { SlashCommandBuilder } from "discord.js";
import { Command } from "../@types";

const supportCommand: Command = {
	data: new SlashCommandBuilder()
		.setName("support")
		.setDescription("If you need any help or want to report a bug."),
	async execute(interaction) {
		await interaction.reply({
			content:
				"For bugs, preferrably create an issue on the [project's GitHub](https://github.com/hyoretsu/maple-helper/issues). If you simply need help, feel free to create an issue there too or hop on to [my server's help channel](https://discord.gg/StuAXSWCm8).",
			ephemeral: true,
		});
	},
};

export default supportCommand;
