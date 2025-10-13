import { MDXRemoteSerializeResult } from "next-mdx-remote";

export enum FormBlockType {
	Markdown = "markdown",
	Image = "image",
}

export type BlockType =
	| {
			id: string;
			type: FormBlockType.Markdown;
			content: string;
	  }
	| {
			id: string;
			type: FormBlockType.Image;
			content: string;
			file?: File;
			alt?: string;
	  };

export type RenderMDXProps = {
	mdxSource: MDXRemoteSerializeResult;
};
