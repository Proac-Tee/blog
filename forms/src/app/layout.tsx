import type { Metadata } from "next";
import { Vollkorn, Work_Sans } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import ThemeToggle from "./components/ThemeToggle";

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
	title: "Forms In React 19",
	description: "Example of how to handle form inputs in react 19",
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
						<ToastContainer />
					</main>
				</ThemeProvider>
			</body>
		</html>
	);
}
