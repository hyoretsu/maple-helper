import { GatewayIntentBits } from "discord.js";
import "dotenv/config";
import FullClient from "./FullClient";
import "./deploy/commands";
import getAllCommands from "./utils/getAllCommands";
import getAllEvents from "./utils/getAllEvents";

const client = new FullClient({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });

// Setup commands
const commands = getAllCommands();
for (const command of commands) {
	client.commands.set(command.data.name, command);
}

// Setup events
const events = getAllEvents();
for (const event of events) {
	// @ts-ignore
	const listener = (...args) => event.execute(...args);

	if (event.once) {
		client.once(event.name, listener);
	} else {
		client.on(event.name, listener);
	}
}

// Log in to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);
