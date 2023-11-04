import {
	AudioPlayerStatus,
	VoiceConnectionStatus,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
} from "@discordjs/voice";
import { Command } from "@types";
import { Guild, GuildMember, SlashCommandBuilder, VoiceChannel } from "discord.js";
import fs from "node:fs/promises";
import path from "node:path";
import tts from "../utils/tts";

const mvpReminderCommand: Command = {
	data: new SlashCommandBuilder()
		.setName("mvp_reminder")
		.setDescription("Starts the MVP bot by hopping into a voice channel.")
		.addUserOption(option =>
			option
				.setName("streamer")
				.setDescription("The user that will be streaming and providing data to the bot."),
		)
		.addChannelOption(option =>
			option
				.setName("channel")
				.setDescription("The channel that will be used. Defaults to your current one."),
		)
		.addNumberOption(option =>
			option
				.setName("resolution")
				.setDescription("The resolution of MapleStory. Defaults to 1920x1080.")
				.addChoices(
					{
						name: "800x600",
						value: 0,
					},
					{
						name: "1024x768",
						value: 1,
					},
					{
						name: "1280x720",
						value: 2,
					},
					{
						name: "1366x768",
						value: 3,
					},
					{
						name: "1920x1080",
						value: 4,
					},
				),
		)
		.addStringOption(option =>
			option.setName("chat-lines").setDescription("The amount of lines being shown in the streamer's chat."),
		)
		.addNumberOption(option =>
			option.setName("font-size").setDescription("The in-game font size you're using.").addChoices(
				{
					name: "Default",
					value: 0,
				},
				{
					name: "Medium",
					value: 1,
				},
				{
					name: "Big",
					value: 2,
				},
				{
					name: "Large",
					value: 3,
				},
			),
		),
	async execute(interaction) {
		const { id: guildId, voiceAdapterCreator: adapterCreator } = interaction.guild as Guild;
		const { id: userId } = interaction.options.getUser("streamer") ?? interaction.member!.user;

		const voiceChannel = (interaction.options.getChannel("channel") ??
			(interaction.member as GuildMember).voice.channel) as VoiceChannel | null;

		if (!voiceChannel) {
			await interaction.reply({
				content: "Invalid channel. Try again. (Join a voice channel or send one in the options)",
				ephemeral: true,
			});
			return;
		}

		const { id: channelId, members: channelUsers } = voiceChannel;
		const chosenUser = channelUsers.get(userId);

		if (!chosenUser) {
			await interaction.reply({
				content: "The person streaming needs to be in a voice channel to start the bot.",
				ephemeral: true,
			});
			return;
		}

		if (!chosenUser.voice.streaming) {
			await interaction.reply({
				content: "The selected person (or you) needs to be streaming in order to start the bot.",
				ephemeral: true,
			});
			return;
		}

		await interaction.reply({ content: "Hopping on for your grinding's joy.", ephemeral: true });

		const connection = joinVoiceChannel({
			channelId,
			guildId,
			adapterCreator,
		});

		// Clean up generated reminder files on disconnection
		connection.on(VoiceConnectionStatus.Disconnected, async () => {
			await fs.rm(path.resolve("./tmp"), {
				force: true,
				recursive: true,
			});
		});

		const player = createAudioPlayer();
		// Subscribe the connection to the audio player (will play audio on the voice connection)
		connection.subscribe(player);

		const messagePath = await tts("MVP daqui a 1 minuto cambada", guildId);
		const message = createAudioResource(messagePath);

		// voiceChannel.priority
		player.play(message);

		// Remove later on
		player.on(AudioPlayerStatus.Idle, () => connection.disconnect());
	},
};

export default mvpReminderCommand;
