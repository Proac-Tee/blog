"use client";

import { useCallback, type MouseEvent } from "react";

export const useRipple = () => {
	return useCallback((event: MouseEvent<HTMLElement>) => {
		const target = event.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		const size = Math.max(rect.width, rect.height);
		const x = event.clientX - rect.left - size / 2;
		const y = event.clientY - rect.top - size / 2;

		const ripple = document.createElement("span");
		ripple.className = "ripple";
		ripple.style.width = ripple.style.height = `${size}px`;
		ripple.style.left = `${x}px`;
		ripple.style.top = `${y}px`;

		const textColor = getComputedStyle(target).color;
		ripple.style.backgroundColor = textColor
			.replace("rgb", "rgba")
			.replace(")", ", 0.25)");

		// Remove any previous ripple
		target.querySelector(".ripple")?.remove();

		// Auto remove after animation ends
		ripple.addEventListener("animationend", () => ripple.remove());

		target.appendChild(ripple);
	}, []);
};
