"use client";

import {
	closestCenter,
	DndContext,
	DragCancelEvent,
	DragEndEvent,
	DragOverlay,
	DragStartEvent,
	KeyboardSensor,
	PointerSensor,
	UniqueIdentifier,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ReactNode, useState } from "react";
import { SortableBlockItem } from "./SortableBlockItem";
import { useMounted } from "@/app/hooks/useMounted";

export type Item = {
	id: string;
	content: ReactNode;
};

type SortableBlockProps = {
	items: Item[];
	onChangeAction: (items: Item[]) => void;
	onRemoveAction: (id: UniqueIdentifier) => void;
	title?: string;
};

export default function SortableBlock({
	items,
	onChangeAction,
	onRemoveAction,
}: SortableBlockProps) {
	const mounted = useMounted();

	const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				delay: 100,
				tolerance: 5,
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	const handleDragStart = (event: DragStartEvent) =>
		setActiveId(event.active.id);

	const handleDragEnd = (event: DragEndEvent) => {
		setActiveId(null);

		const { active, over } = event;
		if (!over) return;

		if (active.id !== over.id) {
			const oldIndex = items.findIndex((item) => item.id === active.id);
			const newIndex = items.findIndex((item) => item.id === over.id);
			onChangeAction(arrayMove(items, oldIndex, newIndex));
		}
	};

	const handleDragCancel = (event: DragCancelEvent) => {
		void event;
		setActiveId(null);
	};

	const getActiveItem = () => {
		return items.find((item) => item.id === activeId)?.content;
	};

	if (!mounted) return null;

	return (
		<div className="w-full">
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragStart={handleDragStart}
				onDragEnd={handleDragEnd}
				onDragCancel={handleDragCancel}
			>
				<SortableContext
					items={items.map((item) => item.id)}
					strategy={verticalListSortingStrategy}
				>
					<ul className="space-y-4">
						{items.map((item) => (
							<SortableBlockItem
								key={item.id}
								id={item.id}
								content={item.content}
								onRemoveAction={onRemoveAction}
							/>
						))}
					</ul>
				</SortableContext>

				<DragOverlay
					adjustScale={true}
					dropAnimation={{
						duration: 150,
						easing: "cubic-bezier(0.18, 0.67, 0.6, 1.22)",
					}}
				>
					{activeId ? (
						<div className="cursor-grabbing rounded-md border bg-blue-50 p-3 shadow-md dark:border-blue-800 dark:bg-blue-900/30">
							<div className="flex items-center gap-3">
								<span className="text-gray-500 dark:text-gray-400">⋮⋮</span>
								<span className="dark:text-gray-200">{getActiveItem()}</span>
							</div>
						</div>
					) : null}
				</DragOverlay>
			</DndContext>
		</div>
	);
}
