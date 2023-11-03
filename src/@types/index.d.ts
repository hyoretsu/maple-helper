import FullClient from "../FullClient";
import { ChatInputCommandInteraction, Interaction, SlashCommandBuilder } from "discord.js";

export type Command = {
	data: SlashCommandBuilder;
	execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
};

export type Event = {
	name: string;
	once: boolean;
	execute: (...args: any) => void;
};
