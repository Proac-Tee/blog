/// <reference types="vitest/config" />
// https://vite.dev/config/

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";
import dts from "vite-plugin-dts";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

import { libInjectCss } from "vite-plugin-lib-inject-css";
import preserveDirectives from "rollup-preserve-directives";

// __dirname for ESM
const dirname =
	typeof __dirname !== "undefined"
		? __dirname
		: path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
	plugins: [
		react(),
		tsconfigPaths(),
		dts({
			insertTypesEntry: true,
			tsconfigPath: path.resolve(dirname, "tsconfig.app.json"),
		}),
		tailwindcss(),
		preserveDirectives(),
		{
			...libInjectCss(),
			enforce: "pre", // this is important to make sure the css is injected before the code is processed
		},
		{
			// libInjectCss (with preserveDirectives) adds the css import to the top of the file
			// this custom handle moves the directive ('use client') to the top of the file again
			name: "custom-swap-directive",
			generateBundle(_, bundle) {
				for (const chunk of Object.values(bundle)) {
					if (chunk.type === "chunk") {
						if (chunk.code.includes("use client")) {
							chunk.code = chunk.code.replace(/['"]use client['"];/, "");
							chunk.code = `'use client';\n${chunk.code}`;
						}
						if (chunk.code.includes("use server")) {
							chunk.code = chunk.code.replace(/['"]use server['"];/, "");
							chunk.code = `'use server';\n${chunk.code}`;
						}
					}
				}
			},
		},
	],
	build: {
		lib: {
			entry: path.resolve(dirname, "src/index.ts"),
			name: "Libray-project",
			fileName: "libray-project",
		},
		rollupOptions: {
			external: ["react", "react-dom", "react/jsx-runtime", "tailwindcss"],
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
					"react/jsx-runtime": "jsxRuntime",
					tailwindcss: "tailwindcss",
				},
			},
		},
	},
	test: {
		projects: [
			{
				extends: true,
				plugins: [
					// The plugin will run tests for the stories defined in your Storybook config
					// See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
					storybookTest({
						configDir: path.resolve(dirname, ".storybook"),
					}),
				],
				test: {
					name: "storybook",
					browser: {
						enabled: true,
						headless: true,
						provider: "playwright",
						instances: [
							{
								browser: "chromium",
							},
						],
					},
					setupFiles: [".storybook/vitest.setup.ts"],
				},
			},
		],
	},
});

