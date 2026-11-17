import policies from "../data/policies.json";
import { Breadcrumb } from "./breadcrumb.tsx";

export function PolicyPage({ page }: { page: keyof typeof policies }) {
	const policy = policies[page];
	return (
		<article className="site-container page-section max-w-215">
			<Breadcrumb title={policy.title} />
			<span className="text-eyebrow block">BEAUTY CODE · ინფორმაცია</span>
			<h1>{policy.title}</h1>
			<div className="reading-content">
				{policy.paragraphs.map((p) =>
					p.heading ? (
						<h2 key={p.text}>{p.text}</h2>
					) : (
						<p key={p.text}>{p.text}</p>
					),
				)}
			</div>
		</article>
	);
}
