import { SlashCommandBuilder } from "discord.js";
import { Command } from "../@types";
import { addDays, differenceInSeconds, format, setDay } from "date-fns";

const bossResetTimerCommand: Command = {
	data: new SlashCommandBuilder()
		.setName("boss_reset_timer")
		.setDescription("Amount of time left for weekly bosses to reset."),
	async execute(interaction) {
		const currentTime = new Date();

		let bossResetTime = setDay(currentTime, 4);
		bossResetTime.setUTCHours(0, 0, 0, 0);

		if (currentTime.getDay() >= 4) {
			bossResetTime = addDays(bossResetTime, 7);
		}

		const delta = differenceInSeconds(bossResetTime, currentTime);

		if (delta <= 60) {
			await interaction.reply({
				content: "Less than 1 minute left until weekly bosses reset!",
				ephemeral: true,
			});

			return;
		}

		const days = delta / (60 * 60 * 24);
		const hours = ((days % 1) * 24) % 24;
		const minutes = ((hours % 1) * 60) % 60;

		let content = "There ";

		if (days > 0) {
			if (days === 1) {
				content += "is ";
			} else if (days > 1) {
				content += "are ";
			}

			content += `${Math.floor(days)} day`;

			if (days === 1) {
				content += "s";
			}
		}

		if (hours > 0) {
			if (days > 0) {
				if (minutes === 0) {
					content += " and";
				} else {
					content += ",";
				}
			}

			content += ` ${Math.floor(hours)} hour`;

			if (hours > 1) {
				content += "s";
			}
		}

		if (minutes > 0) {
			if (days > 0 || hours > 0) {
				content += " and";
			}

			content += ` ${Math.ceil(minutes)} minute`;

			if (minutes > 1) {
				content += "s";
			}
		}

		content += ` left until weekly bosses reset.\n\nThe (local) time for weekly boss reset is:\n${format(
			bossResetTime,
			"eeee, h a",
		)}`;

		await interaction.reply({
			content,
			ephemeral: true,
		});
	},
};

export default bossResetTimerCommand;
