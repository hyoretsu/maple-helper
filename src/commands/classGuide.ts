import { SlashCommandBuilder } from "discord.js";
import { Command } from "../@types";
import guides from "../data/guides.json";
import normalizeClassName from "../utils/normalizeClassName";

const classGuideCommand: Command = {
	data: new SlashCommandBuilder()
		.setName("class_guide")
		.setDescription(
			"Easy-to-get class guide image. (Contact the developer for missing/broken/outdated guides)",
		)
		.addStringOption(option =>
			option.setName("class").setDescription("You'll get the guide image for this class.").setRequired(true),
		),
	async execute(interaction) {
		try {
			const chosenClass = normalizeClassName(interaction.options.getString("class") as string);

			// @ts-ignore
			const guideLink = guides[chosenClass];

			if (!guideLink) {
				await interaction.reply({
					content:
						"Sorry, we don't have the guide for this class yet. Please contact the developer with a link to the image (Please run /class_server and get the link from there).",
					ephemeral: true,
				});

				return;
			}

			await interaction.reply({
				content: `Here is your guide:\n${guideLink}`,
				ephemeral: true,
			});
		} catch {
			await interaction.reply({
				content:
					"The class you requested either doesn't exist in our database or has a wrong spelling. Please try again or contact the developer.",
				ephemeral: true,
			});
		}
	},
};

export default classGuideCommand;
