import { twMerge } from "tailwind-merge";
import { BlockType, FormBlockType } from "./types";
import clsx, { ClassValue } from "clsx";

export function genId() {
	return crypto.randomUUID();
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function blocksToMDX(blocks: BlockType[]): string {
	return blocks
		.map((block) => {
			switch (block.type) {
				case FormBlockType.Markdown:
					return block.content;
				case FormBlockType.Image:
					return block.content ? `![image](${block.content})` : "";
				default:
					return "";
			}
		})
		.join("\n\n");
}
