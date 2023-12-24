import { SlashCommandBuilder } from "discord.js";
import { Command } from "../@types";

const maxDropRateCommand: Command = {
	data: new SlashCommandBuilder()
		.setName("max_drop_rate")
		.setDescription("Quick guide on getting to 400% (394% for most people) Drop Rate."),
	async execute(interaction) {
		await interaction.reply({
			content: `Okay, I'll be short. Get:\n- 200% from Legendary Acessory potentials (Rings, Pendants, Eye/Face Acc and Earrings. If you really want to min-max pitched boss drops get Greed Pendant, but be warned its +20% equipment drop rate (supposedly) does not work above the 400% overall cap.\n- 100% from an Epic/Unique familiar with the "Increases Item Drop Rate by a large amount" line.\n- 50% from legion drop coupon.\n- 20% from (Small) Wealth Acquisition Potion.\nThat brings us to a total of 370%. You can then get to 394% by having DHS at level 30 or to the 400% limit by having/being a Bishop with the real Holy Symbol (or an 8%+ Drop Rate Inner Ability).\n\nHuge tip: if you want to get the absolute max, aim for a Unique familiar with an "Item Acquisition Rate: +10%" potential line. That effectively makes you reach 440% Drop Rate (433% for non-Bishop) since it's applied at the end of the formula and ignores the limit.\n\nNote: Drop Rate increase does not work for AbsoLab/Arcane Umbra equip boxes, but it still applies for soul shards, (supposedly) Dawn/Pitched Boss equips and Skill (Oz) Ring boxes, so you should always equip your drop gear for Akechi and above.`,
			ephemeral: true,
		});
	},
};

export default maxDropRateCommand;
