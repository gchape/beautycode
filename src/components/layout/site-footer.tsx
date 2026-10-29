import { Link } from "@tanstack/react-router";
import { site } from "../../data/site.ts";
import { useCategories } from "../catalog/category-context.tsx";
import { SocialIcon } from "../social-icon.tsx";

export function SiteFooter() {
	const categories = useCategories();
	return (
		<footer className="border-t border-border bg-[#f8f3f4] pt-12.5">
			<div className="mx-auto w-[min(1240px,calc(100%-80px))] max-[1100px]:w-[calc(100%-48px)] max-[560px]:w-[calc(100%-32px)] grid grid-cols-[1.2fr_0.9fr_0.9fr_1.3fr] gap-8.75 [&_h2]:mb-5 [&_h2]:text-[0.9375rem] [&_p]:mt-4.5 [&_p]:text-[0.8125rem] [&_p]:leading-8 [&_p]:text-muted-foreground max-[1100px]:grid-cols-2 max-[560px]:gap-x-3.75 max-[560px]:gap-y-7.5 max-[560px]:[&>div:first-child]:col-span-full max-[560px]:[&>div:last-child]:col-span-full">
				<div>
					<Link
						to="/"
						className="font-[Georgia,serif] text-[1.3125rem] tracking-[0.13em]"
					>
						BEAUTY CODE
					</Link>
					<p>
						შენი სილამაზე. შენი რიტუალი.
						<br />
						შენი კოდი.
					</p>
					<nav
						className="mt-5 flex flex-wrap gap-2.5 [&_a]:inline-flex [&_a]:size-11 [&_a]:items-center [&_a]:justify-center [&_a]:rounded-full [&_a]:border [&_a]:border-border [&_a:hover]:border-primary [&_a:hover]:bg-secondary"
						aria-label="სოციალური ქსელები"
					>
						{site.socials.map(({ name, href }) => (
							<a
								key={name}
								href={href}
								target="_blank"
								rel="noopener noreferrer"
								aria-label={`${name}, იხსნება ახალ ჩანართში`}
								title={name}
							>
								<SocialIcon name={name} />
							</a>
						))}
					</nav>
				</div>
				<div>
					<h2>კატალოგი</h2>
					{categories.map((c) => (
						<Link
							className="block mb-3.5 text-sm wrap-anywhere"
							key={c.slug}
							to="/categories/$slug"
							params={{ slug: c.slug }}
						>
							{c.name}
						</Link>
					))}
				</div>
				<div>
					<h2>ინფორმაცია</h2>
					<Link className="block mb-3.5 text-sm wrap-anywhere" to="/terms">
						წესები და პირობები
					</Link>
					<Link className="block mb-3.5 text-sm wrap-anywhere" to="/returns">
						დაბრუნება
					</Link>
					<Link className="block mb-3.5 text-sm wrap-anywhere" to="/delivery">
						მიწოდება
					</Link>
				</div>
				<div>
					<h2>დაგვიკავშირდი</h2>
					<a
						className="block mb-3.5 text-sm wrap-anywhere"
						href={`tel:${site.phone.e164}`}
					>
						{site.phone.display}
					</a>
					<a
						className="block mb-3.5 text-sm wrap-anywhere"
						href={`mailto:${site.email}`}
					>
						{site.email}
					</a>
					<p>
						{site.company.name}
						<br />
						{site.company.taxId}
						<br />
						{site.company.address}
					</p>
				</div>
			</div>
			<div className="mx-auto w-[min(1240px,calc(100%-80px))] max-[1100px]:w-[calc(100%-48px)] max-[560px]:w-[calc(100%-32px)] mt-7.5 flex flex-wrap justify-between border-t border-border py-5.5 text-xs text-[#89767b] max-[560px]:gap-3.75 max-[560px]:pr-10 max-[560px]:text-[0.6875rem] max-[560px]:leading-[1.8]">
				© {new Date().getFullYear()} Beauty Code{" "}
				<span>შექმნილია შენი ყოველდღიურობისთვის</span>
			</div>
		</footer>
	);
}
