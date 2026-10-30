import { Link } from "@tanstack/react-router";
import { ListChecks, RotateCcw, Truck } from "lucide-react";

export function ServiceBenefits() {
	return (
		<section
			className="site-container grid gap-6 border-b border-border py-7 sm:grid-cols-3 sm:gap-4"
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
			<Link className="home-benefit" to="/products" search={{}}>
				<ListChecks aria-hidden="true" />
				<span>
					პროდუქტის დეტალები<small>აღწერა და მახასიათებლები</small>
				</span>
			</Link>
		</section>
	);
}
