import fs from "node:fs";
import path from "node:path";
import { Event } from "../@types";

const isProduction = process.env.NODE_ENV === "production";

const getAllEvents = () => {
	const events: Event[] = [];

	const eventsPath = path.join(__dirname, ...(isProduction ? [] : [".."]), "events");
	const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(isProduction ? ".js" : ".ts"));

	for (const file of eventFiles) {
		events.push(require(path.join(eventsPath, file)).default);
	}

	return events;
};

export default getAllEvents;
