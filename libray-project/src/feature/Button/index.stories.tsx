import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from ".";

const meta: Meta<typeof Button> = {
	title: "Components/Button",
	component: Button,
	parameters: {
		layout: "centered",
	},
	tags: ["autodocs"],
	argTypes: {
		intent: {
			control: "select",
			options: [
				"primary",
				"secondary",
				"primary_outline",
				"secondary_outline",
				"primary_borderless",
				"secondary_borderless",
			],
		},
		size: {
			control: "select",
			options: ["small", "medium"],
		},
		radius: {
			control: "select",
			options: ["none", "sm", "md", "lg", "xl", "full", "pill", "fat"],
		},
		fullWidth: {
			control: "boolean",
		},
		disabled: {
			control: "boolean",
		},
		loading: {
			control: "boolean",
		},
		iconStart: {
			control: false,
		},
		iconEnd: {
			control: false,
		},
		loader: {
			control: false,
		},
	},
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
	args: {
		children: "Primary",
		intent: "primary",
	},
};

export const Secondary: Story = {
	args: {
		children: "Secondary",
		intent: "secondary",
	},
};

export const PrimaryOutline: Story = {
	args: {
		children: "Primary Outline",
		intent: "primary_outline",
	},
};

export const SecondaryOutline: Story = {
	args: {
		children: "Secondary Outline",
		intent: "secondary_outline",
	},
};
