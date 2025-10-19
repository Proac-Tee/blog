import { cva } from "class-variance-authority";

export const buttonVariant = cva(
	"inline-flex min-w-[160px] items-center justify-center gap-2 min-h-[3rem] cursor-pointer transition-all duration-300 ease-in-out px-4 text-base font-semibold outline-transparent",
	{
		variants: {
			intent: {
				primary: "bg-ui-primary text-ui-white",
				secondary: "bg-ui-secondary text-ui-white",
				primary_outline: "bg-ui-white text-ui-primary border border-ui-primary",
				secondary_outline:
					"bg-ui-white text-ui-secondary border border-ui-secondary",
				primary_borderless: "text-ui-primary",
				secondary_borderless: "text-ui-secondary",
			},
			size: {
				small: "text-sm",
				medium: "text-base",
			},
			radius: {
				none: "rounded-none",
				sm: "rounded-sm",
				md: "rounded-md",
				lg: "rounded-lg",
				xl: "rounded-xl",
				full: "rounded-full",
				pill: "rounded-[3.125rem]",
				fat: "rounded-[6.25rem]",
			},
			fullWidth: {
				true: "w-full",
				false: "w-fit",
			},
			disabled: {
				false: null,
				true: "opacity-50 cursor-not-allowed",
			},
			loading: {
				true: "pointer-events-none relative",
				false: "",
			},
			iconPosition: {
				left: "flex-row",
				right: "flex-row-reverse",
			},
		},
		compoundVariants: [
			{
				intent: "primary",
				disabled: false,
				className: "hover:brightness-85",
			},
			{
				intent: "secondary",
				disabled: false,
				className: "hover:brightness-85",
			},
			{
				intent: "primary_outline",
				disabled: false,
				className: "hover:border-ui-primary/50",
			},
			{
				intent: "secondary_outline",
				disabled: false,
				className: "hover:border-ui-secondary/50",
			},
			{
				intent: "primary_borderless",
				disabled: false,
				className: "hover:brightness-75",
			},
			{
				intent: "secondary_borderless",
				disabled: false,
				className: "hover:brightness-75",
			},
		],
		defaultVariants: {
			disabled: false,
			intent: "primary",
			size: "medium",
			radius: "pill",
			fullWidth: false,
			loading: false,
			iconPosition: "left",
		},
	},
);
