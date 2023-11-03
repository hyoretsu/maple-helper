import { VoiceConnectionStatus } from "@discordjs/voice";
import { Event } from "@types";
import fs from "node:fs/promises";
import path from "node:path";

const disconnectedEvent: Event = {
	name: VoiceConnectionStatus.Disconnected,
	once: true,
	async execute() {
		await fs.unlink(path.resolve("./tmp"));
	},
};

export default disconnectedEvent;
