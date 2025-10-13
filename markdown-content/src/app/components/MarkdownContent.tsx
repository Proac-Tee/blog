import { UniqueIdentifier } from "@dnd-kit/core";
import { BlockType, FormBlockType } from "../lib/types";

export type UpdateBlock<T> = (
	id: UniqueIdentifier,
	updated: string | Partial<T>,
) => void;

export type MarkDownContentProps<T extends BlockType> = {
	block: T;
	update: UpdateBlock<T>;
};

export const MarkDownContent = <T extends BlockType>({
	block,
	update,
}: MarkDownContentProps<T>) => {
	switch (block.type) {
		case FormBlockType.Markdown:
			return (
				<textarea
					placeholder="Write markdown here (e.g. # Heading, **bold**, - list)"
					className="min-h-[200px] w-full outline-none p-2 font-work-sans placeholder:text-sm placeholder:italic dark:text-primary-white"
					value={block.content}
					onChange={(e) => update(block.id, e.target.value)}
					onKeyDown={(e) => e.stopPropagation()}
				/>
			);

		case FormBlockType.Image:
			return (
				<div className="space-y-2">
					<input
						type="file"
						accept="image/*"
						className="w-full outline-none p-2 placeholder:text-sm placeholder:italic"
						onChange={(e) => {
							const file = e.target.files?.[0];
							if (file) {
								const objectUrl = URL.createObjectURL(file);
								update(block.id, {
									...block,
									content: objectUrl,
									file,
								});
							}
						}}
					/>

					{block.content && (
						<img
							src={block.content}
							alt="Uploaded preview"
							className="max-h-16 rounded border object-contain"
						/>
					)}
				</div>
			);

		default:
			return null;
	}
};
