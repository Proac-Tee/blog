import DemoContent from "./components/DemoContent";

export default function Home() {
	return (
		<section>
			<h1 className="text-4xl sm:text-5xl md:text-6xl mb-5 font-bold">
				Demo Sortable Content
			</h1>
			<DemoContent />
		</section>
	);
}
