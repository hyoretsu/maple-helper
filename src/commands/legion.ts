import { SlashCommandBuilder } from "discord.js";
import { Command } from "../@types";
import legion from "../data/legion.json";

const legionCommand: Command = {
	data: new SlashCommandBuilder().setName("legion_effects").setDescription("List of all legion effects."),
	async execute(interaction) {
		await interaction.reply({
			content: `**Critical damage**, **boss damage** and **IED** increase as follows: \`1/2/3/5/6%\`\n**Critical rate** and **mesos obtained** increase as follows: \`1/2/3/4/5%\`\n**Flat HP/MP** increases as follows: \`250/500/1000/2000/2500\`\n**Flat stat** increases as follows: \`10/20/40/80/100\`\n**HP/MP percentage** and **skill cooldown** increase as follows: \`2/3/4/5/6%\`\n\nHere is the list of all legion block effects:${Object.entries(
				legion,
			).reduce((str, [className, effect]) => `${str}\n- ${className}: \`${effect}\``, "")}`,
			ephemeral: true,
		});
	},
};

export default legionCommand;
