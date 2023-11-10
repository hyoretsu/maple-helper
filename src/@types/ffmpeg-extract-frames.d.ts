declare module "ffmpeg-extract-frames" {
	interface ExtractFramesArgs {
		input: string;
		output: string;
		offsets?: number[];
	}

	export default function extractFrames(args: ExtractFramesArgs): Promise<void>;
}
