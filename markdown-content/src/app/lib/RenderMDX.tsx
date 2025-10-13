import { MDXRemote } from "next-mdx-remote";
import { MDXErrorBoundary } from "../components/MDXErrorBoundary";
import { RenderMDXProps } from "./types";
import { components } from "./mdx-components";

const RenderMDX = ({ mdxSource }: RenderMDXProps) => {
	return (
		<MDXErrorBoundary>
			<MDXRemote {...mdxSource} components={components} />
		</MDXErrorBoundary>
	);
};

export default RenderMDX;
