export enum FormBlockType {
	Markdown = "textArea",
}

export type BlockType = {
	id: string;
	type: FormBlockType.Markdown;
	content: string;
};
