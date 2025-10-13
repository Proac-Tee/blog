"use server";

import { serialize } from "next-mdx-remote/serialize";

export const handleMDXContent = async ({ content }: { content: string }) => {
	const mdxSource = await serialize(content, {
		mdxOptions: {
			remarkPlugins: [],
			rehypePlugins: [],
		},
		parseFrontmatter: false,
	});

	return mdxSource;
};
