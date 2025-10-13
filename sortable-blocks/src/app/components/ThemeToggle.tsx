"use client";

import { Button } from "@coniungo/ui";
import { cn } from "../lib/utils";
import { useTheme } from "next-themes";
import SystemIcon from "../svg/SystemIcon";
import LigthIcon from "../svg/LigthIcon";
import DarkIcon from "../svg/DarkIcon";
import { useMounted } from "../hooks/useMounted";

const ThemeToggle = () => {
	const mounted = useMounted();
	const { theme, setTheme } = useTheme();

	if (!mounted) return null;

	return (
		<div className="border-gray-300 dark:border-border border-[1px] rounded-full">
			<Button
				intent={theme === "system" ? "secondary" : "secondary_borderless"}
				fullWidth={false}
				className={cn("min-w-0 min-h-0 p-2")}
				aria-label="System theme toggle"
				onClick={() => setTheme("system")}
			>
				<SystemIcon className="size-3" />
			</Button>

			<Button
				intent={theme === "light" ? "secondary" : "secondary_borderless"}
				fullWidth={false}
				className={cn("min-w-0 min-h-0 p-2")}
				aria-label="Light theme toggle"
				onClick={() => setTheme("light")}
			>
				<LigthIcon className="size-3" />
			</Button>

			<Button
				intent={theme === "dark" ? "secondary" : "secondary_borderless"}
				fullWidth={false}
				className={cn("min-w-0 min-h-0 p-2")}
				aria-label="Dark theme toggle"
				onClick={() => setTheme("dark")}
			>
				<DarkIcon className="size-3" />
			</Button>
		</div>
	);
};

export default ThemeToggle;
