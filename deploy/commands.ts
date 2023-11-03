import { REST, RESTPutAPIApplicationCommandsResult, Routes } from "discord.js";
import getAllCommands from "../src/utils/getAllCommands";
import "dotenv/config";

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.DISCORD_TOKEN as string);

(async () => {
	try {
		const commands = await getAllCommands();

		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		let route: `/${string}`;

		if (process.env.NODE_ENV === "production") {
			route = Routes.applicationCommands(process.env.CLIENT_ID as string);
		} else {
			route = Routes.applicationGuildCommands(
				process.env.CLIENT_ID as string,
				process.env.GUILD_ID as string,
			);
		}

		// The put method is used to fully refresh all commands in the guild with the current set
		const data = (await rest.put(route, {
			body: commands.map(command => command.data.toJSON()),
		})) as RESTPutAPIApplicationCommandsResult;

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();
