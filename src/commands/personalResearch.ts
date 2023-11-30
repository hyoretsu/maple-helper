import { SlashCommandBuilder } from "discord.js";
import { Command } from "../@types";

const weeklyUpgrades = [
	"Monster Mow-Down 1 lv1~3",
	"Cache Investigation 1 lv1 (lv230, 450 AF)",
	"Cache Investigation 1 lv2 (lv240, 600 AF)",
	"Cache Investigation 1 lv3 (lv250, 750 AF)",
	"Cache Investigation 2 lv1 (lv260, 70 SAC. If you're under lv260, skip these two)",
	"Cache Investigation 2 lv2 (lv270, 230 SAC)",
	"Monster Mow-Down 1 lv4~5",
	"Add Items lv1~3",
	"Monster Mow-Down 2 lv1~3",
	"Default Distribution Amount Enhancement 1 lv1~2",
	"Maximum Distribution Amount Enhancement 1 lv1~2",
	"Default Distribution Amount Enhancement 2 lv1~2",
	"Dragon Studies 1 lv1~2",
	"Dragon Studies 2 lv1~2",
	"Buff Support lv1~5",
	"Monster Mow-Down 3 lv1~3",
	"Monster Mow-Down 4 lv1~5",
	"Dragon Studies 3 lv1~2",
	"Dragon Studies 4 lv1~3",
	"Dragon Studies 5 lv1~3",
	"Monster Mow-Down 5 lv1~5",
	"Monster Mow-Down 3 lv4~5",
	"Monster Mow-Down 2 lv4~5",
];

const personalResearchCommand: Command = {
	data: new SlashCommandBuilder()
		.setName("personal_research_guide")
		.setDescription(
			"A guide to maximize EXP gains from Guild Castle's personal research. Credits: u/TwigodMS.",
		),
	async execute(interaction) {
		await interaction.reply({
			content: `Here is the recommended order to do Personal Research to get better EXP gains:${weeklyUpgrades.reduce(
				(str, upgrade, index) => `${str}\n- ${upgrade}`,
				"",
			)}`,
			ephemeral: true,
		});
	},
};

export default personalResearchCommand;
