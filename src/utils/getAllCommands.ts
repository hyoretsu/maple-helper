import { Command } from "@types";
import fs from "node:fs";
import path from "node:path";

const getAllCommands = () => {
	const commands: Command[] = [];

	const commandsPath = path.join(__dirname, "..", "commands");
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".ts"));

	for (const file of commandFiles) {
		commands.push(require(path.join(commandsPath, file)).default);
	}

	return commands;
};

export default getAllCommands;
