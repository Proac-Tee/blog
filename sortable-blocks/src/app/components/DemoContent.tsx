"use client";

import { useDemoBlocks } from "../hooks/useDemoBlocks";
import { cn } from "../lib/utils";
import DemoForm from "./form/DemoForm";
import PreviewBlocks from "./PreviewBlocks";

const DemoContent = () => {
	const sessionBlock = useDemoBlocks();

	return (
		<>
			<div className="p-4 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-4 justify-between items-start bg-primary-white dark:bg-primary-black">
				<div className="w-full">
					<DemoForm sessionBlocks={sessionBlock} />
				</div>
				<div
					className={cn(
						"w-full rounded-md border p-3 transition-colors min-h-[300px]",
						"bg-white/30 dark:bg-gray-800/30 border-gray-300 dark:border-gray-700 backdrop-blur-md shadow-sm",
					)}
				>
					<PreviewBlocks blocks={sessionBlock.blocks} />
				</div>
			</div>
		</>
	);
};

export default DemoContent;
