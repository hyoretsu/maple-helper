import { SlashCommandBuilder } from "discord.js";
import { Command } from "../@types";

const commerciCommand: Command = {
	data: new SlashCommandBuilder().setName("commerci").setDescription("Easy-to-get Commerci guide."),
	async execute(interaction) {
		await interaction.reply({
			content:
				"First, unlock all the way to Herb Town in order to unlock CPQ. This will give you the most amount of Denaro, and if you're not trying to speedrun it's okay to just run this 3 times a day.\nFor the best solo (recommended) voyage, run this (34 Denaro, 9m35s):\n- 1x Rosa: 2 Colonia Primo, 2 Commerci Soap (5 Denaro)\n- 1x Luna: 1 Stylish Glasses, 1 Organic Leather, 2 Commerci Soap (5 Denaro)\n- 6x Luna: 4 Commerci Soap (24 Denaro)\n\nFor the quickest voyage, just run all Dolce with Commerci Soap (30 Denaro, 4m40s).\nNote: this is what most people with Dreadnought do for the sake of simplicity (48 Denaro, 5m36s).\n\n**CPQ**\nNot really much to say here, other than that this will be your quickest (and laziest) way of farming Denaro. Talk to Maestra Fiametta in Commerci's Trading Post map (all the way to the left) and select the \"Move to the Merchant Union trade location\" option. You'll then be teleported to 1 of 3 private channels. Talk to her again, move to the 1st channel, form a party of 3 and select \"Proceed with Merchant Union Trade.\" There are 3 different voyages you can (randomly) get when doing CPQ:\n- Goldway, which gives 6 Denaro.\n- Huntersway, which gives 4 Denaro.\n- Silkway, which gives 3 Denaro (but only takes 30s).\nAfter finishing a voyage, you need to accept your rewards by selecting the same option before beginning a new one. Additionally, you'll receive a bonus of 1/2/3 Denaro for being ranked 3/2/1 in the voyage (damage/mob count-wise).",
			ephemeral: true,
		});
	},
};

export default commerciCommand;
