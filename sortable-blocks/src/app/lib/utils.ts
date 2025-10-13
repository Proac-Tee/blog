import { twMerge } from "tailwind-merge";
import clsx, { ClassValue } from "clsx";
import { BlockType, FormBlockType } from "./types";

export function genId() {
	return crypto.randomUUID();
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function blocksToContent(blocks: BlockType[]): string {
	return blocks
		.map((block) => {
			switch (block.type) {
				case FormBlockType.Markdown:
					return block.content;
				default:
					return "";
			}
		})
		.join("\n\n");
}
