"use client";

import { useEffect, useState } from "react";
import { BlockType } from "../lib/types";
import { blocksToContent } from "../lib/utils";

type PreviewBlocksProps = {
	blocks: BlockType[];
};

const PreviewBlocks = ({ blocks }: PreviewBlocksProps) => {
	const [sortableSource, setSortableSource] = useState<string | null>(null);

	useEffect(() => {
		if (!blocks.length) {
			setSortableSource(null);
			return;
		}

		const handler = setTimeout(() => {
			const content = blocksToContent(blocks);

			if (content.trim().length > 0) {
				setSortableSource(content);
			} else {
				setSortableSource(null);
			}
		}, 500);

		return () => clearTimeout(handler);
	}, [blocks]);

	if (!sortableSource) {
		return (
			<div className="text-sm text-gray-500 italic">
				Start typing to see preview...
			</div>
		);
	}

	const paragraphs = sortableSource.split(/\n{2,}/).map((p, idx) => (
		<p key={idx} className="mb-3 leading-relaxed text-gray-800">
			{p.trim()}
		</p>
	));

	return <section className="prose">{paragraphs}</section>;
};

export default PreviewBlocks;
