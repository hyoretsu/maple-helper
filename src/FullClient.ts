import { Command } from "@types";
import { Client, Collection } from "discord.js";

export default class FullClient extends Client {
	commands = new Collection<string, Command>();
}
