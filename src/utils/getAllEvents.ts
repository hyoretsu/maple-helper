import fs from "node:fs";
import path from "node:path";
import { Event } from "../@types";

const getAllEvents = () => {
	const events: Event[] = [];

	const eventsPath = path.join(__dirname, "..", "events");
	const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith(".ts"));

	for (const file of eventFiles) {
		events.push(require(path.join(eventsPath, file)).default);
	}

	return events;
};

export default getAllEvents;
