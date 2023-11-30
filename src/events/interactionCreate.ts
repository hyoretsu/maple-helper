import { ChatInputCommandInteraction, Events, Interaction } from "discord.js";
import { Event } from "../@types";
import FullClient from "../FullClient";

const readyEvent: Event = {
	name: Events.InteractionCreate,
	once: false,
	async execute(interaction: Interaction) {
		if (!interaction.isChatInputCommand() && !interaction.isAutocomplete()) {
			return;
		}

		const command = (interaction.client as FullClient).commands.get(interaction.commandName);
		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);

			return;
		}

		if (interaction instanceof ChatInputCommandInteraction) {
			try {
				await command.execute(interaction);
			} catch (error) {
				console.error(error);

				if (interaction.replied || interaction.deferred) {
					await interaction.followUp({
						content: "There was an error while executing this command!",
						ephemeral: true,
					});
				} else {
					await interaction.reply({
						content: "There was an error while executing this command!",
						ephemeral: true,
					});
				}
			}
		} else {
			try {
				await command.autocomplete?.(interaction);
			} catch (error) {
				console.error(error);
			}
		}
	},
};

export default readyEvent;
