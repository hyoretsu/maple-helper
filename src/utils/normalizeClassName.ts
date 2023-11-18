import servers from "../data/servers.json";

const classes = Object.keys(servers);

const abbreviations: Record<string, string> = {
	ab: "angelic buster",
	bm: "battle mage",
	bt: "beast tamer",
	bw: "blaze wizard",
	da: "demon avenger",
	db: "dual blade",
	dk: "dark knight",
	ds: "demon slayer",
	dw: "dawn warrior",
	fp: "fire/poison mage",
	"fp mage": "fire/poison mage",
	il: "ice/lightning mage",
	"il mage": "ice/lightning mage",
	nl: "night lord",
	nw: "night walker",
	tb: "thunder breaker",
	wa: "wind archer",
	wh: "wild hunter",
};

const normalizeClassName = (givenClass: string) => {
	givenClass = givenClass.toLowerCase();

	// If the class name wasn't abbreviated, skip the rest
	if (classes.find(className => givenClass === className)) {
		return givenClass;
	}

	givenClass = givenClass.replaceAll("/", "");

	const realClassName = abbreviations[givenClass];

	if (!realClassName) {
		throw new Error();
	}

	return realClassName;
};

export default normalizeClassName;
