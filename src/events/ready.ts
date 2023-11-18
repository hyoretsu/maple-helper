import { Events } from "discord.js";
import { Event } from "../@types";
import FullClient from "../FullClient";

const readyEvent: Event = {
	name: Events.ClientReady,
	once: true,
	execute(client: FullClient) {
		console.log(`Ready! Logged in as ${client.user?.tag}`);
	},
};

export default readyEvent;
