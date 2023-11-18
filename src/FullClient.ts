import { Client, Collection } from "discord.js";
import { Command } from "./@types";

export default class FullClient extends Client {
	commands = new Collection<string, Command>();
}
