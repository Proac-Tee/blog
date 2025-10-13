"use client";

import { useEffect, useState } from "react";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { BlockType } from "../lib/types";
import { blocksToMDX } from "../lib/utils";
import { handleMDXContent } from "../server/actions";
import RenderMDX from "../lib/RenderMDX";

type PreviewMDXProps = {
	blocks: BlockType[];
};

const PreviewMarkDown = ({ blocks }: PreviewMDXProps) => {
	const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(
		null,
	);

	useEffect(() => {
		if (!blocks.length) {
			setMdxSource(null);
			return;
		}

		const handler = setTimeout(() => {
			const content = blocksToMDX(blocks);

			if (content.trim().length > 0) {
				handleMDXContent({ content }).then(setMdxSource);
			} else {
				setMdxSource(null);
			}
		}, 500);

		return () => clearTimeout(handler);
	}, [blocks]);

	if (!mdxSource) {
		return (
			<div className="text-sm text-gray-500 italic">
				Start typing to see preview...
			</div>
		);
	}

	return <RenderMDX mdxSource={mdxSource} />;
};

export default PreviewMarkDown;
