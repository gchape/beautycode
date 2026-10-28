import policies from "../data/policies.json";
import { Breadcrumb } from "./breadcrumb.tsx";

export function PolicyPage({ page }: { page: keyof typeof policies }) {
	const policy = policies[page];
	return (
		<article className="wrap policy page-section">
			<Breadcrumb title={policy.title} />
			<span className="eyebrow">BEAUTY CODE · ინფორმაცია</span>
			<h1>{policy.title}</h1>
			<div className="policy-body">
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
