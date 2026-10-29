import policies from "../data/policies.json";
import { Breadcrumb } from "./breadcrumb.tsx";

export function PolicyPage({ page }: { page: keyof typeof policies }) {
	const policy = policies[page];
	return (
		<article className="mx-auto w-[min(1240px,calc(100%-80px))] max-[1100px]:w-[calc(100%-48px)] max-[560px]:w-[calc(100%-32px)] max-w-215 min-h-[60vh] pt-6.25 pb-20 [&>h1]:mt-4 [&>h1]:mb-6 [&>h1]:text-4xl max-[560px]:[&>h1]:text-3xl">
			<Breadcrumb title={policy.title} />
			<span className="block text-[0.8125rem] font-medium tracking-[0.13em] max-[560px]:text-xs">
				BEAUTY CODE · ინფორმაცია
			</span>
			<h1>{policy.title}</h1>
			<div className="[&_h2]:mt-9.5 [&_h2]:mb-4.5 [&_h2]:text-2xl [&_h2]:leading-[1.6] [&_p]:text-base [&_p]:leading-8 [&_p]:whitespace-pre-wrap [&_p]:wrap-anywhere max-[560px]:[&_h2]:text-[1.3125rem]">
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
