import { cva } from "class-variance-authority";

export const buttonVariant = cva(
	"inline-flex items-center justify-center gap-1  py-2 cursor-pointer transition-all duration-300 ease-in-out px-4 text-base",
	{
		variants: {
			intent: {
				primary: "bg-primary text-white",
				secondary: "bg-secondary text-white",
				primary_outline: "bg-white text-primary border border-primary",
				secondary_outline: "bg-white text-secondary border border-secondary",
				primary_borderless: "text-primary",
				secondary_borderless: "text-secondary",
				gray_outline: "bg-white text-black border border-gray",
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
			},
			fullWidth: {
				true: "w-full",
				false: "w-fit",
			},
			disabled: {
				false: null,
				true: "opacity-45 cursor-not-allowed",
			},
			loading: {
				true: "cursor-not-allowed relative",
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
				className: "hover:brightness-90",
			},
			{
				intent: "secondary",
				disabled: false,
				className: "hover:brightness-75",
			},
			{
				intent: "primary_outline",
				disabled: false,
				className: "hover:bg-primary/10",
			},
			{
				intent: "secondary_outline",
				disabled: false,
				className: "hover:bg-secondary/10",
			},
			{
				intent: "primary_borderless",
				disabled: false,
				className: "hover:bg-primary/10 disabled:bg-[#68e9da]",
			},
			{
				intent: "secondary_borderless",
				disabled: false,
				className: "hover:bg-secondary/10",
			},
		],
		defaultVariants: {
			disabled: false,
			intent: "primary",
			size: "medium",
			radius: "lg",
			fullWidth: true,
			loading: false,
			iconPosition: "left",
		},
	},
);
