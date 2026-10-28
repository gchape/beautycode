import { Link } from "@tanstack/react-router";
import { useCategories } from "../catalog/category-context";
import { SocialIcon } from "../social-icon";
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
						{[
							{
								name: "Facebook" as const,
								href: "https://www.facebook.com/Beatlovegeorgia/",
							},
							{
								name: "Instagram" as const,
								href: "https://www.instagram.com/beautycode1_",
							},
							{
								name: "TikTok" as const,
								href: "https://www.tiktok.com/@beauty.code13",
							},
						].map(({ name, href }) => (
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
					<a href="tel:+995574074833">574 07 48 33</a>
					<a href="mailto:13beautycode@gmail.com">13beautycode@gmail.com</a>
					<p>
						შპს Tech Beauty ტექ ბიუთი
						<br />
						ს/კ 412794196
						<br />
						ქ. ქუთაისი ნინოშვილის 10-ე შესახვევი N2
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
