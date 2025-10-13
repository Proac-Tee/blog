import { MDXComponents } from "mdx/types";
import { ComponentPropsWithoutRef } from "react";
import { highlight } from "sugar-high";
import Link from "next/link";
import Image from "next/image";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;
type EmphasisProps = ComponentPropsWithoutRef<"em">;
type StrongProps = ComponentPropsWithoutRef<"strong">;
type CodeProps = ComponentPropsWithoutRef<"code">;
type ImageProps = ComponentPropsWithoutRef<"img">;
type HorizonalRuleprops = ComponentPropsWithoutRef<"hr">;

export const components: MDXComponents = {
	h1: (props: HeadingProps) => (
		<h1
			className="font-vollkron text-4xl sm:text-5xl font-semibold text-gray-900 dark:text-zinc-100 mt-10 mb-6 leading-tight tracking-tight"
			{...props}
		/>
	),
	h2: (props: HeadingProps) => (
		<h2
			className="font-vollkron text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-zinc-100 mt-12 mb-4 leading-snug border-b border-b-gray-300 dark:border-b-border pb-2"
			{...props}
		/>
	),
	h3: (props: HeadingProps) => (
		<h3
			className="font-vollkron text-xl sm:text-2xl font-medium text-gray-800 dark:text-zinc-200 mt-8 mb-3 leading-snug"
			{...props}
		/>
	),
	h4: (props: HeadingProps) => (
		<h4
			className="font-vollkron text-lg font-medium text-gray-800 dark:text-zinc-300 mt-6 mb-2"
			{...props}
		/>
	),

	p: (props: ParagraphProps) => (
		<p
			className="font-work-sans text-base sm:text-lg leading-relaxed text-gray-800 dark:text-zinc-300 my-4"
			{...props}
		/>
	),

	ol: (props: ListProps) => (
		<ol
			className="font-work-sans list-decimal pl-6 my-4 space-y-2 text-gray-800 dark:text-zinc-300"
			{...props}
		/>
	),

	ul: (props: ListProps) => (
		<ul
			className="font-work-sans list-disc pl-6 my-4 space-y-2 text-gray-800 dark:text-zinc-300"
			{...props}
		/>
	),

	li: (props: ListItemProps) => (
		<li className="pl-1 leading-relaxed" {...props} />
	),

	em: (props: EmphasisProps) => (
		<em className="italic text-gray-700 dark:text-zinc-300" {...props} />
	),
	strong: (props: StrongProps) => (
		<strong
			className="font-semibold text-gray-900 dark:text-zinc-100"
			{...props}
		/>
	),

	a: ({ href, children, ...props }: AnchorProps) => {
		const className =
			"text-primary/75 font-medium underline underline-offset-4 decoration-2 hover:decoration-primary/75 transition-colors ease-in-out duration-300";

		if (href?.startsWith("/")) {
			return (
				<Link href={href} className={className} {...props}>
					{children}
				</Link>
			);
		}

		if (href?.startsWith("#")) {
			return (
				<a href={href} className={className} {...props}>
					{children}
				</a>
			);
		}

		return (
			<a
				href={href}
				target={"_blank"}
				rel="noopener noreferrer"
				className={className}
				{...props}
			>
				{children}
			</a>
		);
	},

	code: ({ children, ...props }: CodeProps) => {
		const codeString = Array.isArray(children)
			? children.join("")
			: typeof children === "string"
				? children
				: "";

		const codeHTML = highlight(codeString);

		return (
			<code
				className="rounded bg-gray-100 dark:bg-zinc-800 px-1.5 py-0.5 font-mono text-sm text-pink-600 dark:text-pink-400"
				dangerouslySetInnerHTML={{ __html: codeHTML }}
				{...props}
			/>
		);
	},

	pre: (props) => (
		<pre
			className="overflow-x-auto rounded-lg bg-gray-100 dark:bg-zinc-800 p-4 my-6 font-mono text-sm leading-relaxed shadow-sm border border-gray-300 dark:border-border"
			{...props}
		/>
	),

	blockquote: (props: BlockquoteProps) => (
		<blockquote
			className="border-l-4 border-gray-300 dark:border-border pl-5 italic my-6 text-gray-700 dark:text-zinc-300 bg-gray-50 dark:bg-zinc-800/50 py-2 rounded-r"
			{...props}
		/>
	),

	img: ({ src, alt, width, height, ...props }: ImageProps) => {
		if (!src) return null;

		let finalWidth = 650;
		let finalHeight = 434;

		const url = new URL(src as string);
		const urlParams = url.searchParams;

		const paramWidth = urlParams.get("width");
		const paramHeight = urlParams.get("height");

		const parsedWidth = paramWidth ? parseInt(paramWidth, 10) : Number(width);
		const parsedHeight = paramHeight
			? parseInt(paramHeight, 10)
			: Number(height);

		if (!isNaN(parsedWidth) && parsedWidth > 0) finalWidth = parsedWidth;
		if (!isNaN(parsedHeight) && parsedHeight > 0) finalHeight = parsedHeight;

		return (
			<Image
				src={src as string}
				alt={alt ?? ""}
				width={finalWidth}
				height={finalHeight}
				className="my-6 rounded-lg shadow-md object-cover"
				style={{ width: "100%", height: "auto" }}
				{...props}
			/>
		);
	},

	hr: (props: HorizonalRuleprops) => (
		<hr
			className="text-gray-300 dark:text-border border-gray-300 dark:border-border"
			{...props}
		/>
	),
};

declare global {
	type MDXProvidedComponents = typeof components;
}
