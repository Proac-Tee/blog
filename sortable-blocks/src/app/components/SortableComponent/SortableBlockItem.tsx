"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { UniqueIdentifier } from "@dnd-kit/core";
import { ReactNode } from "react";
import { Button } from "@coniungo/ui";
import { cn } from "@/app/lib/utils";
import DeleteIcon from "@/app/svg/DeleteIcon";

type SortableBlockItemProps = {
	id: UniqueIdentifier;
	content: ReactNode;
	onRemoveAction: (id: UniqueIdentifier) => void;
};

export const SortableBlockItem = ({
	id,
	content,
	onRemoveAction,
}: SortableBlockItemProps) => {
	const {
		setNodeRef,
		attributes,
		listeners,
		transform,
		transition,
		isDragging,
	} = useSortable({ id });

	const style = {
		transform: CSS.Translate.toString(transform),
		transition,
	};

	return (
		<li
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={cn(
				"rounded-md border p-3 w-full transition-colors",
				"bg-white/30 dark:bg-gray-800/30 border-gray-300 dark:border-gray-700 backdrop-blur-md shadow-sm",
				isDragging
					? "border-2 border-dashed border-gray-300 dark:border-border opacity-50"
					: "hover:bg-background",
			)}
		>
			<div className="flex items-stretch gap-3 w-full">
				<div className="cursor-grab touch-none active:cursor-grabbing text-gray-500 dark:text-gray-400 shrink-0">
					<span>⋮⋮</span>
				</div>

				<div className="flex-1 min-w-0 flex gap-2 items-start justify-between">
					<div className="flex-1 min-w-0">{content}</div>

					<Button
						fullWidth={false}
						intent={"secondary_borderless"}
						type="button"
						className="min-w-0 min-h-0 p-2"
						onClick={() => onRemoveAction(id)}
					>
						<DeleteIcon />
					</Button>
				</div>
			</div>
		</li>
	);
};
