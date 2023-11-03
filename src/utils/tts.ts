import * as googleTTS from "google-tts-api";
import fs from "node:fs";
import path from "node:path";

export default async function tts(text: string, guildId: string): Promise<string> {
	if (!fs.existsSync("./tmp")) {
		fs.mkdirSync("./tmp");
	}

	const timestamp = new Date().getTime();
	const filePath = path.resolve(`./tmp/${guildId}-${timestamp}.mp3`);

	fs.writeFileSync(
		filePath,
		await googleTTS.getAudioBase64(text, {
			lang: "pt",
			slow: false,
		}),
		"base64",
	);

	return filePath;
}
