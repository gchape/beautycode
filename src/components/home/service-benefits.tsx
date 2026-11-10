import { Link } from "@tanstack/react-router";
import { Banknote, RotateCcw, Truck } from "lucide-react";

export function ServiceBenefits() {
	return (
		<section
			className="site-container grid gap-3 border-b border-border py-4 sm:grid-cols-3 sm:gap-4 sm:py-6"
			aria-label="ჩვენი მომსახურება"
		>
			<Link className="home-benefit" to="/delivery">
				<Truck aria-hidden="true" />
				<span>
					უფასო მიწოდება<small>მთელ საქართველოში</small>
				</span>
			</Link>
			<Link className="home-benefit" to="/returns">
				<RotateCcw aria-hidden="true" />
				<span>
					დაბრუნების პირობები<small>გაეცანი შეკვეთამდე</small>
				</span>
			</Link>
			<Link className="home-benefit" to="/delivery">
				<Banknote aria-hidden="true" />
				<span>
					გადახდის არჩევანი<small>გადარიცხვა ან ნაღდი</small>
				</span>
			</Link>
		</section>
	);
}
