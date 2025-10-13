import type { Metadata } from "next";
import { Vollkorn, Work_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import ThemeToggle from "./components/ThemeToggle";

import "./globals.css";

const vollkron = Vollkorn({
	variable: "--font-vollkron",
	subsets: ["latin"],
	display: "swap",
});

const workSans = Work_Sans({
	variable: "--font-work-sans",
	subsets: ["latin"],
	display: "swap",
	weight: ["400", "500"],
});

export const metadata: Metadata = {
	title: "Markdown Content",
	description: "Example of how to manage remote markdown content",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${workSans.variable} ${vollkron.variable} antialiased`}>
				<ThemeProvider attribute={"class"} defaultTheme="system" enableSystem>
					<main className="max-w-[1280px] p-4 mx-auto min-h-screen">
						<header className="w-fit my-8 mx-auto">
							<ThemeToggle />
						</header>
						{children}
					</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
