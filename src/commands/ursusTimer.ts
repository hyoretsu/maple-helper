import { differenceInSeconds, format } from "date-fns";
import { SlashCommandBuilder } from "discord.js";
import { Command } from "../@types";

const ursusTimerCommand: Command = {
	data: new SlashCommandBuilder().setName("ursus_timer").setDescription("Amount of time left for Ursus 2x."),
	async execute(interaction) {
		const currentTime = new Date();
		const currentHour = currentTime.getUTCHours();

		const ursusAmTime = [new Date(currentTime), new Date(currentTime)];
		ursusAmTime[0].setUTCHours(1, 0, 0, 0);
		ursusAmTime[1].setUTCHours(5, 0, 0, 0);

		const ursusPmTime = [new Date(currentTime), new Date(currentTime)];
		ursusPmTime[0].setUTCHours(18, 0, 0, 0);
		ursusPmTime[1].setUTCHours(22, 0, 0, 0);

		let delta: number;
		let inProgress = false;

		if (currentHour < 1) {
			delta = differenceInSeconds(ursusAmTime[0], currentTime);
		} else if (currentHour >= 1 && currentHour < 5) {
			delta = differenceInSeconds(ursusAmTime[1], currentTime);
			inProgress = true;
		} else if (currentHour >= 5 && currentHour < 18) {
			delta = differenceInSeconds(ursusPmTime[0], currentTime);
		} else if (currentHour >= 18 && currentHour < 22) {
			delta = differenceInSeconds(ursusPmTime[1], currentTime);
			inProgress = true;
		} else {
			ursusAmTime[0].setUTCDate(ursusAmTime[0].getUTCDate() + 1);
			delta = differenceInSeconds(ursusAmTime[0], currentTime);
		}

		if (delta <= 60) {
			await interaction.reply({
				content: "Less than 1 minute left until Ursus 2x ends!",
				ephemeral: true,
			});

			return;
		}

		const hours = delta / (60 * 60);
		const minutes = ((hours % 1) * 60) % 60;

		let content = "There are only";
		if (hours > 0) {
			content += ` ${Math.floor(hours)} hour`;

			if (hours > 1) {
				content += "s";
			}

			if (minutes > 0) {
				content += " and";
			}
		}

		if (minutes > 0) {
			content += ` ${Math.ceil(minutes)} minute`;

			if (minutes > 1) {
				content += "s";
			}
		}

		content += ` left until Ursus 2x${inProgress ? " ends" : ""}.`;

		content += `\n\nThe (local) times for Ursus 2x are:\n- ${format(ursusAmTime[0], "h a")} until ${format(
			ursusAmTime[1],
			"h a",
		)}\n- ${format(ursusPmTime[0], "h a")} until ${format(ursusPmTime[1], "h a")}`;

		await interaction.reply({
			content,
			ephemeral: true,
		});
	},
};

export default ursusTimerCommand;
