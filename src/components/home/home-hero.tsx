import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button.tsx";

export function HomeHero() {
	return (
		<section className="hero wrap">
			<div className="hero-copy">
				<span className="eyebrow">
					<span className="little-line" /> შენი ყოველდღიური რიტუალი
				</span>
				<h1>
					სილამაზე იწყება
					<br />
					<em>შენით.</em>
				</h1>
				<p>
					აღმოაჩინე მოვლა, რომელიც შენ გიხდება.
					<br />
					პატარა დეტალები, დიდი თავდაჯერებულობა.
				</p>
				<Button asChild>
					<Link to="/products" search={{}}>
						აღმოაჩინე კოლექცია <ArrowUpRight size={19} />
					</Link>
				</Button>
				<span className="hero-note">
					შერჩეული შენთვის · ზრუნვით გამოგზავნილი
				</span>
			</div>
			<div className="hero-products">
				<span className="hero-product-orbit" aria-hidden="true" />
				<img
					className="hero-product-kit"
					src="/images/ipl-kit-cutout.png"
					alt="IPL ეპილაციის ნაკრები დამცავი სათვალით და ორი თავაკით"
					width="1536"
					height="1024"
				/>
				<img
					className="hero-product-main"
					src="/images/scalp-massager-cutout.png"
					alt="წითელი სკალპის მასაჟორ-სავარცხელი"
					width="1254"
					height="1254"
					fetchPriority="high"
				/>
				<img
					className="hero-product-colors"
					src="/images/ipl-colors-cutout.png"
					alt="ეპილაციის აპარატები სამ ფერში"
					width="1312"
					height="1199"
				/>
				<span className="hero-product-caption">მოვლა, შენს სივრცეში.</span>
			</div>
		</section>
	);
}
