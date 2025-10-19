"use client";

import { Loader } from "@/svg/Loader";
import type { ButtonHTMLAttributes, FC, MouseEvent, ReactNode } from "react";
import { buttonVariant } from "./variant";
import type { VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { useRipple } from "./hooks/useRipple";

export type ButtonProps = Omit<
	ButtonHTMLAttributes<HTMLButtonElement>,
	"disabled"
> &
	VariantProps<typeof buttonVariant> & {
		loading?: boolean;
		loader?: ReactNode;
		iconStart?: ReactNode;
		iconEnd?: ReactNode;
	};

export const Button: FC<ButtonProps> = ({
	className,
	intent,
	size,
	radius,
	disabled,
	fullWidth,
	loading,
	onClick,
	loader,
	iconStart,
	iconEnd,
	children,
	...props
}) => {
	const ripple = useRipple();

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		ripple(event as MouseEvent<HTMLElement>);
		onClick?.(event);
	};

	return (
		<button
			onClick={handleClick}
			className={cn(
				"relative overflow-hidden",
				buttonVariant({
					intent,
					size,
					radius,
					disabled,
					fullWidth,
					loading,
				}),
				className,
			)}
			disabled={disabled || loading}
			aria-busy={loading}
			{...props}
		>
			{loading && (
				<span
					className="absolute inset-0 flex items-center justify-center transition-opacity duration-200"
					aria-live="polite"
				>
					{loader ?? <Loader />}
				</span>
			)}
			{/* Hide content visually when loading, but keep in DOM */}
			<span
				className={cn(
					"flex items-center gap-2 transition-opacity duration-200",
					loading && "opacity-0",
				)}
			>
				{iconStart && <span className="flex-shrink-0">{iconStart}</span>}
				{children}
				{iconEnd && <span className="flex-shrink-0">{iconEnd}</span>}
			</span>
		</button>
	);
};
