import FullClient from "../FullClient";
import {
	AutocompleteInteraction,
	ChatInputCommandInteraction,
	Interaction,
	SlashCommandBuilder,
} from "discord.js";

type NormalCommand = Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
type SubCommand = Omit<
	SlashCommandBuilder,
	| "addAttachmentOption"
	| "addBooleanOption"
	| "addChannelOption"
	| "addIntegerOption"
	| "addMentionableOption"
	| "addNumberOption"
	| "addRoleOption"
	| "addStringOption"
	| "addUserOption"
>;

export type Command = {
	data: NormalCommand | SubCommand;
	execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
	autocomplete?: (interaction: AutocompleteInteraction) => Promise<void>;
};

export type Event = {
	name: string;
	once: boolean;
	execute: (...args: any) => void;
};

declare module "*.json" {
	export default Record<string, string>;
}
