import type { StorybookConfig } from "@storybook/react-vite";
import path from "node:path";
import tsconfigPaths from "vite-tsconfig-paths";

const config: StorybookConfig = {
	stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
	addons: [
		"@chromatic-com/storybook",
		"@storybook/addon-docs",
		"@storybook/addon-onboarding",
		"@storybook/addon-a11y",
		"@storybook/addon-vitest",
	],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	core: {
		builder: "@storybook/builder-vite",
	},

	viteFinal: async (config) => {
		config.plugins?.push(
			tsconfigPaths({
				projects: [path.resolve("./tsconfig.app.json")],
			}),
		);
		return config;
	},
};

export default config;

