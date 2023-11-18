import { VoiceConnectionStatus } from "@discordjs/voice";
import fs from "node:fs/promises";
import path from "node:path";
import { Event } from "../@types";

const disconnectedEvent: Event = {
	name: VoiceConnectionStatus.Disconnected,
	once: true,
	async execute() {
		await fs.unlink(path.resolve("./tmp"));
	},
};

export default disconnectedEvent;
