import fs from "node:fs";
import path from "node:path";
import { Command } from "../@types";

const isProduction = process.env.RAILWAY_ENVIRONMENT_NAME === "production";

const getAllCommands = () => {
	const commands: Command[] = [];

	const commandsPath = path.join(process.cwd(), isProduction ? "dist" : "src", "commands");
	const commandFiles = fs
		.readdirSync(commandsPath)
		.filter(file => file.endsWith(isProduction ? ".js" : ".ts"));

	for (const file of commandFiles) {
		commands.push(require(path.join(commandsPath, file)).default);
	}

	return commands;
};

export default getAllCommands;
