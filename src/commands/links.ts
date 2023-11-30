import { SlashCommandBuilder } from "discord.js";
import { Command } from "../@types";
import links from "../data/links.json";

const classes = Object.keys(links);

const linksCommand: Command = {
	data: new SlashCommandBuilder()
		.setName("link_skills")
		.setDescription(
			"Descriptions of all link skills. (Can't list them because it's more than 2k characters long)",
		)
		.addStringOption(option =>
			option
				.setName("class")
				.setDescription("Class you want to know the link skill of.")
				.setAutocomplete(true),
		),
	async execute(interaction) {
		const chosenClass = interaction.options.getString("class") as string;

		if (!classes.find(job => job === chosenClass)) {
			await interaction.reply({
				content: "You sent an invalid class. Please try again.",
				ephemeral: true,
			});

			return;
		}

		await interaction.reply({
			// @ts-ignore
			content: `Here's the link skill of ${chosenClass}:\n\`\`\`${links[chosenClass]}\`\`\``,
			ephemeral: true,
		});
	},
	async autocomplete(interaction) {
		const value = interaction.options.getFocused();
		const choices = classes;

		const filteredChoices = choices.filter(choice => choice.toLowerCase().search(value.toLowerCase()) >= 0);

		await interaction.respond(filteredChoices.map(choice => ({ name: choice, value: choice })));
	},
};

export default linksCommand;
