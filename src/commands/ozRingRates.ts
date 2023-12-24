import { SlashCommandBuilder } from "discord.js";
import { Command } from "../@types";

const ozRingRatesCommand: Command = {
	data: new SlashCommandBuilder()
		.setName("oz_ring_rates")
		.setDescription("Rates to get RoR, WJ or CR level 3/4 in all of the boxes. Credits to u/xMilkies."),
	async execute(interaction) {
		await interaction.reply({
			content:
				"These are the rates for the new Oz Ring boxes:\nhttps://media.discordapp.net/attachments/1175486649904414780/1175487373543477378/image.png",
			ephemeral: true,
		});
	},
};

export default ozRingRatesCommand;
