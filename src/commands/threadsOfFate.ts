import { SlashCommandBuilder } from "discord.js";
import { Command } from "../@types";

const threadsOfFateCommand: Command = {
	data: new SlashCommandBuilder()
		.setName("threads_of_fate")
		.setDescription(
			"Threads of Fate guide (a.k.a. daily EAP/WAP farm). Start with the 'requirements' command.",
		)
		.addSubcommand(command =>
			command
				.setName("farming")
				.setDescription(
					"Optimized potion farming guide. Only needed if you want to min-max or to keep it in mind.",
				),
		)
		.addSubcommand(command => command.setName("gifts").setDescription("List of gifts for all the NPC's."))
		.addSubcommand(command =>
			command
				.setName("requirements")
				.setDescription("What you must do to unlock the daily farming. I recommend you to start here."),
		)
		.addSubcommand(command => command.setName("skills").setDescription("List of every NPC's skill."))
		.addSubcommand(command => command.setName("strategy").setDescription("List of gifts for all the NPC's.")),
	async execute(interaction) {
		switch (interaction.options.getSubcommand()) {
			case "farming":
				await interaction.reply({
					content:
						"Crafting WAP's and EAP's require rather rare recipes, as in the EAP's only drops from 4 daily bosses and WAP's only from HHilla. The recipes only last for 24 hours, have a cooldown of 5 minutes per craft and consume 5 Fatigue, but each craft yields 3 potions, so keep that in mind. (That's 6 hours per craft, or 6 potions for 3h total in the case of Small WAP, which is extremely useful to max Drop Rate in bosses without wasting a lot of WAP time)\nThe max amount of each you can keep in a single slot is 999 (At least 29h5m of extremely optimized crafting, i.e. 2 recipes total).\n\nIf you're hardcore about crafting them (or want to stock as much as possible), learn the recipe 9h30min~11 hours before the reset to have some room for being late (you need 9h5min in order to empty your fatigue and craft 309 potions). Then, after the `/daily_reset`, you'll have 14h30~13h to craft another 309. ~~After that maybe throw in 5 revitalizers for an entire day without sleeping and make that 818 potions total (309+309+200).~~.\nFinally, you need 1 Superior Empty Bottle, 10 Juniper Berry Seed Oil, 3 Superior Item Crystal and 1 Philosopher's Stone in order to craft them (or 1/5/2/1 for the Small WAP). The rest can be obtained by extracting high level equipment, farmable from daily bosses.\n\nGood job if you're grinding with both active or good luck on pitched drops if you're using Small WAP's to reach 394% drop rate!",
					ephemeral: true,
				});

				return;
			case "gifts":
				await interaction.reply({
					content:
						"- **Ibaraki**: level 4 alchemy potion that enhances STR, DEX, INT, LUK or DEF.\n- **Izuna**: alchemy flowers.\n- **Kamaitachi**: lv110~120 Warrior/Pirate hats, Mage gloves, Archer shoes and Thief overalls.\n- **Kino Konoko**: any emotional mushroom doll by monsters nearby Mushroom Shrine.\n- **Kubinashi**: Briser Grim Seeker and Briser swords.\n- **Kurama**: any Arrow for Bow.\n- **Nue**: Ramen (easiest to get, just buy from Bronze in Mushroom Shrine), Melting Cheese and Reindeer Milk.\n- **Takeno Konoko**: Red/Orange/White/Blue Potion or Elixir.\n- **Tengu**: shining ores (Amethyst, AquaMarine, Emerald, Garnet, Opal).\n- **Yorozu**: Twisted Time, Basic Spell Essence, Basic Item Crystal, Intermediate Item Crystal and Alchemist Stone (easiest to get, just purchase from Ardentmill).",
					ephemeral: true,
				});

				return;
			case "requirements":
				await interaction.reply({
					content:
						'In short, do the Mushroom Shrine Tales questline. You can either do it until you unlock at least 2 characters in Threads of Fate, which is pretty fast, or until shortly after you defeat Tengu (complete Tengu\'s Training quest). Why go the extra mile? In order to get Tengu\'s Judgement skill (+20 ATT/M.ATT), +3% Auto Steal if you also take the effort to unlock Kubinashi and Nue (theoretically +3% final mesos) and be able to use the Threads of Fate drop from a daily Yazuka Boss in Showa Town to easily get 7 Closeness with any NPC.\n\nThen, you simply need to get two NPCs\' Closeness to 50+ by either talking every 30min or using the Gift option (Detailed guide in the `/threads_of_fate gifts` command). Afterwards, keep using the Ask function on the same one (once every day) until you get "Gather Herbs" or "Chop Wood" quests. After you have 1 NPC with one of those quests and 1 extra NPC, run the `/threads_of_fate strategy` command.\n\nIf you face any difficulties while doing it, read this [detailed guide](https://www.reddit.com/r/Maplestory/comments/p574l9) from u/thefulgorah.',
					ephemeral: true,
				});

				return;
			case "skills": // Todo
				await interaction.reply({
					content: "",
					ephemeral: true,
				});

				return;
			case "strategy":
				await interaction.reply({
					content:
						"Only the first Ask of the day resets the mission, so the strategy is to have 2 NPC's unlocked and reset the 2nd NPC's quest in order to keep either \"Gather Herbs\" or \"Chop Wood\" on the 1st one.\nE.g. if you choose Tengu to have the farming quest (because of its buff) you must first Ask any other character and logout. When you do that, you don't complete the Ask but already triggered the reset (this is important because you can only Ask 5 times per day). Then log back in and keep Asking Tengu 5 times. **[1]**\n\nThese quests consist of simply waiting for 30min without changing channels **[2]** and give you 15 Suspicious Herb Pouch + 1 for every 10 extra Closeness you have with that character, so it's important to always have them at 100 Closeness (in other words, choose a NPC with easy gifts or keep a stock of Threads of Fate). If you change channels, you \"fail\" the quest and receive 1 million Mesos.\nThese pouches are insane because they give you any Herbalism oil in amounts of 1 to 30, including the oil needed to craft both EXP Accumulation/Wealth Acquisition potions (EAP and WAP for short). So even if you're unlucky to only get Juniper Berry Seed Oil a few times (out of 100 every day), chances are you'll still get a lot.\n\n**[1]** It is extremely important to never complete an Ask after the daily reset. I'm not sure of the exact downsides, but if you complete the last Ask after reset you can't do any more for that day.\n**[2]** The not-so-obvious reasons for failure are going to the Cash Shop, using Random Portals and doing Ursus, Ranmaru, Gollux or CPQ. These all either change channels or send you to a private channel, so make sure to avoid them. What DOESN'T make you fail is doing Monster Park, MPE, solo Commerci Voyages, Sharenian Culvert, Flag Race and going to any Guild Castle area.",
					ephemeral: true,
				});

				return;
		}
	},
};

export default threadsOfFateCommand;
