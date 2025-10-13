import DemoMarkdown from "./components/DemoMarkdown";

export default function Home() {
	return (
		<section>
			<h1 className="text-4xl sm:text-5xl md:text-6xl mb-5 font-bold">
				Demo Markdown Content
			</h1>
			<DemoMarkdown />
		</section>
	);
}
