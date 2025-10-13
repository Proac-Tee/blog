"use client";

import { ReactNode, Component } from "react";

type ErrorBoundaryProps = { children: ReactNode };
type ErrorBoundaryState = { hasError: boolean; error?: Error };

export class MDXErrorBoundary extends Component<
	ErrorBoundaryProps,
	ErrorBoundaryState
> {
	state: ErrorBoundaryState = { hasError: false };

	static getDerivedStateFromError(error: Error) {
		return { hasError: true, error };
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="bg-red-50 text-red-800 p-4 rounded-md font-work-sans text-sm">
					! Something went wrong while rendering this section of the Markdown.
					make sure you close components tags if any or render supported tags.
				</div>
			);
		}

		return this.props.children;
	}
}
