import { SlashCommandBuilder } from "discord.js";
import { Command } from "../@types";
import bossesPdr from "../data/bosses_pdr.json";

const bosses = Object.keys(bossesPdr);

const calculateDmgDealt = (ied: number, pdr: number, percent = true) => {
	return (pdr * (ied / 100 - 1) + 100) * (!percent ? 0.01 : 1);
};

const iedCommand: Command = {
	data: new SlashCommandBuilder()
		.setName("ied")
		.setDescription("IED-related commands.")
		.addSubcommand(command =>
			command
				.setName("calculate")
				.setDescription(
					"Calculate how much damage you'll gain by getting more IED (either new or existing sources).",
				)
				.addNumberOption(option =>
					option
						.setName("current_ied")
						.setDescription(
							"Your current total IED as shown in stats window. From Lomien to Black Mage, this is 300%.",
						)
						.setRequired(true),
				)
				.addNumberOption(option =>
					option
						.setName("new_source")
						.setDescription(
							"Your new source of IED. (If you wanna know your new IED after removing a source, set this to 0)",
						),
				)
				.addNumberOption(option =>
					option.setName("pdr").setDescription("Your boss's PDR (Percent Damage Reduction)."),
				)
				.addStringOption(option =>
					option
						.setName("boss")
						.setDescription("The boss you want to check damage for (instead of manually inputting its PDR).")
						.setAutocomplete(true),
				)
				.addNumberOption(option =>
					option
						.setName("old_source")
						.setDescription(
							"Your old source of IED. Use this when you're increasing an existing source e.g. legion board.",
						),
				),
		)
		.addSubcommand(command =>
			command
				.setName("compare")
				.setDescription("Calculate how much damage you'll deal at various IED levels.")
				.addStringOption(option =>
					option
						.setName("ied")
						.setDescription(
							"A list of the IED levels you want to compare, separated by a comma and without %.",
						)
						.setRequired(true),
				)
				.addNumberOption(option =>
					option.setName("pdr").setDescription("Your boss's PDR (Percent Damage Reduction)."),
				)
				.addStringOption(option =>
					option
						.setName("boss")
						.setDescription("The boss you want to check damage for (instead of manually inputting its PDR).")
						.setAutocomplete(true),
				),
		)
		.addSubcommand(command =>
			command
				.setName("effectiveness")
				.setDescription("Damage dealt to bosses at various IED levels. Credits: u/Ephine."),
		),
	async execute(interaction) {
		switch (interaction.options.getSubcommand()) {
			case "calculate": {
				let pdr = interaction.options.getNumber("pdr");
				const boss = interaction.options.getString("boss");
				if (boss) {
					if (!pdr) {
						// @ts-ignore
						const bossPdr = bossesPdr[boss];
						if (!bossPdr) {
							await interaction.reply({
								content:
									"The boss you sent does not exist in our database. Please check for any spelling mistakes.",
								ephemeral: true,
							});

							return;
						}

						pdr = bossPdr;
					} else {
						// bossPdr && pdr
						await interaction.reply({
							content:
								"You sent both a manual PDR value and a boss to get the PDR value from. Please, use one or the other.",
							ephemeral: true,
						});

						return;
					}
				}

				let currentIed = interaction.options.getNumber("current_ied") as number;
				const newSource = interaction.options.getNumber("new_source");
				const oldSource = interaction.options.getNumber("old_source");

				if (newSource === 0 && !oldSource && !pdr) {
					await interaction.reply({
						content:
							"It looks like you're either trying to do nothing or remove a source of IED but didn't send the old one.",
						ephemeral: true,
					});

					return;
				}

				let currentDmg: number | undefined;

				if (oldSource) {
					if (pdr) {
						currentDmg = calculateDmgDealt(currentIed, pdr);
					}

					// Remove the old source's IED from our total to reuse the new IED calc
					currentIed = (currentIed - oldSource) / (1 - oldSource / 100);
				}

				const newIed = currentIed + (newSource || 0) * (1 - currentIed / 100);

				if (pdr) {
					if (!currentDmg) {
						currentDmg = pdr * (currentIed / 100 - 1) + 100;
					}
					const newDmg = calculateDmgDealt(newIed, pdr);
					const dmgIncrease = (newDmg / currentDmg - 1) * 100;

					await interaction.reply({
						content: `Currently, with \`${(
							currentIed + (oldSource ? oldSource * (1 - currentIed / 100) : 0)
						).toFixed(2)}%\` IED you're dealing \`${currentDmg.toFixed(
							2,
						)}%\` damage to a boss with ${pdr}% PDR.${
							newSource !== null
								? `\n\nIf you ${
										!newSource ? "remove this source, your IED" : `add a source of ${newSource}% IED, it`
								  } will go to \`${newIed.toFixed(2)}%\` and your damage dealt will become \`${newDmg.toFixed(
										2,
								  )}%\`, meaning a ${Math.abs(dmgIncrease).toFixed(2)}% ${
										dmgIncrease > 0 ? "increase" : "decrease"
								  }.`
								: ""
						}`,
						ephemeral: true,
					});

					return;
				}

				await interaction.reply({
					content: `If you add a source of \`${newSource}%\` IED, you will have \`${newIed.toFixed(
						2,
					)}%\` IED.\n\nTip: run this command again with a PDR value to know how this impacts your damage.`,
					ephemeral: true,
				});

				return;
			}
			case "compare": {
				const ied = interaction.options
					.getString("ied")!
					.split(",")
					.map(value => Number(value));
				let pdr = interaction.options.getNumber("pdr") as number;
				const boss = interaction.options.getString("boss");

				if (ied.length < 2) {
					await interaction.reply({
						content: "You need to send at least two IED values to compare.",
						ephemeral: true,
					});

					return;
				}

				if (boss) {
					if (!pdr) {
						// @ts-ignore
						const bossPdr = bossesPdr[boss];
						if (!bossPdr) {
							await interaction.reply({
								content:
									"The boss you sent does not exist in our database. Please check for any spelling mistakes.",
								ephemeral: true,
							});

							return;
						}

						pdr = bossPdr;
					} else {
						// bossPdr && pdr
						await interaction.reply({
							content:
								"You sent both a manual PDR value and a boss to get the PDR value from. Please, use one or the other.",
							ephemeral: true,
						});

						return;
					}
				} else if (!pdr) {
					pdr = 300;
				}

				await interaction.reply({
					content: ied.reduce(
						(str, value) =>
							`${str}\n- \`${calculateDmgDealt(value, pdr).toFixed(2)}%\` damage at \`${value}%\` IED`,
						`For bosses with ${pdr}% PDR, you will deal:`,
					),
					ephemeral: true,
				});

				return;
			}
			case "effectiveness": {
				await interaction.reply({
					content:
						"https://media.discordapp.net/attachments/1175486649904414780/1175910687520862238/image.png",
					ephemeral: true,
				});

				return;
			}
		}
	},
	async autocomplete(interaction) {
		const value = interaction.options.getFocused();
		const choices = bosses;

		const filteredChoices = choices.filter(choice => choice.toLowerCase().search(value.toLowerCase()) >= 0);

		await interaction.respond(filteredChoices.map(choice => ({ name: choice, value: choice })));
	},
};

export default iedCommand;
