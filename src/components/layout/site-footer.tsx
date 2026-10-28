import { Link } from "@tanstack/react-router";
import { site } from "../../data/site.ts";
import { useCategories } from "../catalog/category-context.tsx";
import { SocialIcon } from "../social-icon.tsx";
export function SiteFooter() {
	const categories = useCategories();
	return (
		<footer>
			<div className="wrap footer-grid">
				<div>
					<Link to="/" className="footer-brand">
						BEAUTY CODE
					</Link>
					<p>
						შენი სილამაზე. შენი რიტუალი.
						<br />
						შენი კოდი.
					</p>
					<nav className="footer-socials" aria-label="სოციალური ქსელები">
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
					<h3>კატალოგი</h3>
					{categories.map((c) => (
						<Link key={c.slug} to="/categories/$slug" params={{ slug: c.slug }}>
							{c.name}
						</Link>
					))}
				</div>
				<div>
					<h3>ინფორმაცია</h3>
					<Link to="/terms">წესები და პირობები</Link>
					<Link to="/returns">დაბრუნება</Link>
					<Link to="/delivery">მიწოდება</Link>
				</div>
				<div>
					<h3>დაგვიკავშირდი</h3>
					<a href={`tel:${site.phone.e164}`}>{site.phone.display}</a>
					<a href={`mailto:${site.email}`}>{site.email}</a>
					<p>
						{site.company.name}
						<br />
						{site.company.taxId}
						<br />
						{site.company.address}
					</p>
				</div>
			</div>
			<div className="wrap footer-bottom">
				© {new Date().getFullYear()} Beauty Code{" "}
				<span>შექმნილია შენი ყოველდღიურობისთვის</span>
			</div>
		</footer>
	);
}
