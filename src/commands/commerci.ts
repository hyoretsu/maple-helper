import { SlashCommandBuilder } from "discord.js";
import { Command } from "../@types";

const commerciCommand: Command = {
	data: new SlashCommandBuilder().setName("commerci").setDescription("Easy-to-get Commerci guide."),
	async execute(interaction) {
		await interaction.reply({
			content:
				"First, unlock all the way to Herb Town in order to unlock Merchant Union trade (CPQ). This will give you the most amount of denaros, and if you're not trying to speedrun it's okay to just run this 3 times daily.\n\nFor the best solo (recommended) voyage, run this (34 denaros, 9m35s):\n- 1x Rosa: 2 Colonia Primo, 2 Commerci Soap (5 denaros)\n- 1x Luna: 1 Stylish Glasses, 1 Organic Leather, 2 Commerci Soap (5 denaros)\n- 6x Luna: 4 Commerci Soap (24 denaros)\n\nFor the quickest voyage, just run all Dolce with Commerci Soap (30 denaros, 4m40s).\nNote: this is what most people with Dreadnought do for the sake of simplicity (48 denaros, 5m36s).",
			ephemeral: true,
		});
	},
};

export default commerciCommand;
