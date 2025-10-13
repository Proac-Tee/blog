"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { genId } from "../lib/utils";
import { UniqueIdentifier } from "@dnd-kit/core";
import { BlockType, FormBlockType } from "../lib/types";

export type UseDemoBlocksReturn = {
	blocks: BlockType[];
	addBlock: (type: FormBlockType) => void;
	updateBlock: (
		id: UniqueIdentifier,
		content: string | Partial<BlockType>,
	) => void;
	removeBlock: (id: UniqueIdentifier) => void;
	reorderBlocks: (newOrder: BlockType[]) => void;
	clearBlocks: () => void;
	isSubmitDisabled: boolean;
};

/**
 * A demo/testing hook with localStorage persistence.
 */
export const useDemoBlocks = (
	storageKey: string = "demo-sortable-blocks",
): UseDemoBlocksReturn => {
	const [blocks, setBlocks] = useState<BlockType[]>([]);
	const saveTimeout = useRef<NodeJS.Timeout | null>(null);

	// Load from localStorage on mount
	useEffect(() => {
		if (typeof window === "undefined") return;
		const saved = localStorage.getItem(storageKey);
		if (saved) {
			setBlocks(JSON.parse(saved));
		}
	}, [storageKey]);

	// Debounced save to localStorage
	useEffect(() => {
		if (typeof window === "undefined") return;

		if (saveTimeout.current) clearTimeout(saveTimeout.current);

		saveTimeout.current = setTimeout(() => {
			localStorage.setItem(storageKey, JSON.stringify(blocks));
		}, 400);

		return () => {
			if (saveTimeout.current) clearTimeout(saveTimeout.current);
		};
	}, [blocks, storageKey]);

	const addBlock = useCallback((type: FormBlockType) => {
		setBlocks((prev) => [...prev, { id: genId(), type, content: "" }]);
	}, []);

	const updateBlock = useCallback(
		(id: UniqueIdentifier, updated: Partial<BlockType> | string) => {
			setBlocks((prev) =>
				prev.map((b) =>
					b.id === id
						? typeof updated === "string"
							? { ...b, content: updated }
							: { ...b, ...updated }
						: b,
				),
			);
		},
		[],
	);

	const removeBlock = useCallback((id: UniqueIdentifier) => {
		setBlocks((prev) => prev.filter((b) => b.id !== id));
	}, []);

	const reorderBlocks = useCallback((newOrder: BlockType[]) => {
		setBlocks(newOrder);
	}, []);

	const clearBlocks = useCallback(() => {
		setBlocks([]);
		if (typeof window !== "undefined") {
			localStorage.removeItem(storageKey);
		}
	}, [storageKey]);

	const isSubmitDisabled =
		blocks.length === 0 || blocks.some((b) => !b.content?.trim());

	return {
		blocks,
		addBlock,
		updateBlock,
		removeBlock,
		reorderBlocks,
		clearBlocks,
		isSubmitDisabled,
	};
};
