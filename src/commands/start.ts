import {
	AudioPlayerStatus,
	VoiceConnectionStatus,
	createAudioPlayer,
	createAudioResource,
	joinVoiceChannel,
} from "@discordjs/voice";
import { Command } from "@types";
import { Guild, GuildMember, SlashCommandBuilder } from "discord.js";
import fs from "node:fs/promises";
import path from "node:path";
import tts from "utils/tts";

const startCommand: Command = {
	data: new SlashCommandBuilder()
		.setName("start")
		.setDescription("Starts the bot by hopping into your voice channel and watching your stream."),
	async execute(interaction) {
		const { id: guildId, voiceAdapterCreator: adapterCreator } = interaction.guild as Guild;
		const { id: userId } = interaction.member!.user;

		const {
			voice: { channelId },
		} = interaction.guild?.members.cache.get(userId) as GuildMember;

		if (!channelId) {
			await interaction.reply({
				content: "**Error**\nYou need to be in a voice channel to start the bot.",
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

		player.play(message);

		player.on(AudioPlayerStatus.Idle, () => connection.disconnect());
	},
};

export default startCommand;
