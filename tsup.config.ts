import type { Options } from "tsup";

export const tsup: Options = {
	clean: true,
	entry: ["src/main.ts", "src/commands/*", "src/events/*"],
	format: ["cjs"],
	minify: true,
	outDir: "dist",
	skipNodeModulesBundle: true,
	target: "node18",
};
