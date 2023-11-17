import FullClient from "../FullClient";
import { ChatInputCommandInteraction, Interaction, SlashCommandBuilder } from "discord.js";

export type Command = {
	data: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
	execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
};

export type Event = {
	name: string;
	once: boolean;
	execute: (...args: any) => void;
};

declare module "*.json" {
	export default Record<string, string>;
}
