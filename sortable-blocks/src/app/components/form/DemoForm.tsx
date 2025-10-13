import { UseDemoBlocksReturn } from "@/app/hooks/useDemoBlocks";
import { FormBlockType } from "@/app/lib/types";
import { Button } from "@coniungo/ui";
import SortableBlock from "../SortableComponent/SortableBlock";
import { SortableContent } from "../SortableContent";

type DemoBlogFormProps = {
	sessionBlocks: UseDemoBlocksReturn;
};

const DemoForm = ({ sessionBlocks }: DemoBlogFormProps) => {
	const {
		blocks,
		addBlock,
		isSubmitDisabled,
		updateBlock,
		removeBlock,
		reorderBlocks,
		clearBlocks,
	} = sessionBlocks;

	return (
		<section className="space-y-4 w-full">
			<div className="flex flex-wrap gap-2 w-full max-w-full overflow-x-auto">
				{Object.values(FormBlockType).map((type) => (
					<Button
						type="button"
						key={type}
						fullWidth={false}
						className="py-2 min-h-fit min-w-fit bg-transparent dark:bg-gray-800/30 rounded-md cursor-pointer italic text-sm font-normal"
						intent={"primary_outline"}
						onClick={() => addBlock(type)}
					>
						{type}
					</Button>
				))}
			</div>
			<div className="min-h-[300px] md:min-h-[50vh]">
				<SortableBlock
					items={blocks?.map((b) => ({
						id: b.id,
						content: (
							<SortableContent<typeof b> block={b} update={updateBlock} />
						),
					}))}
					onChangeAction={(newItems) => {
						const reordered = newItems.map(
							(item) => blocks.find((b) => b.id === item.id)!,
						);
						reorderBlocks(reordered);
					}}
					onRemoveAction={removeBlock}
				/>
			</div>
			<Button
				type="submit"
				disabled={isSubmitDisabled}
				className="bg-transparent dark:bg-gray-800/30 rounded-md"
				intent={"secondary_outline"}
				onClick={clearBlocks}
			>
				Clear Content
			</Button>
		</section>
	);
};

export default DemoForm;
