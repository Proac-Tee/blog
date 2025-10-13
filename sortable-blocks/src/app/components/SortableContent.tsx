import { UniqueIdentifier } from "@dnd-kit/core";
import { BlockType, FormBlockType } from "../lib/types";

export type UpdateBlock<T> = (
	id: UniqueIdentifier,
	updated: string | Partial<T>,
) => void;

export type SortableContentProps<T extends BlockType> = {
	block: T;
	update: UpdateBlock<T>;
};

export const SortableContent = <T extends BlockType>({
	block,
	update,
}: SortableContentProps<T>) => {
	switch (block.type) {
		case FormBlockType.Markdown:
			return (
				<textarea
					placeholder="Write content here..."
					className="min-h-[200px] w-full outline-none p-2 font-work-sans placeholder:text-sm placeholder:italic dark:text-primary-white"
					value={block.content}
					onChange={(e) => update(block.id, e.target.value)}
					onKeyDown={(e) => e.stopPropagation()}
				/>
			);

		default:
			return null;
	}
};
