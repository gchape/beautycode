import { Link } from "@tanstack/react-router";
import { MessageCircle, RotateCcw, Truck } from "lucide-react";
import { useContact } from "../contact/contact-context";
import { Button } from "../ui/button";

export function ServiceBenefits() {
	const contact = useContact();
	return (
		<section className="benefits wrap" aria-label="ჩვენი მომსახურება">
			<Link to="/delivery">
				<Truck />
				<div>
					<h3>უფასო მიწოდება</h3>
					<p>მთელ საქართველოში</p>
				</div>
			</Link>
			<Link to="/returns">
				<RotateCcw />
				<div>
					<h3>დაბრუნების შესაძლებლობა</h3>
					<p>გაეცანი დაბრუნების პირობებს</p>
				</div>
			</Link>
			<Button variant="ghost" onClick={() => contact()}>
				<MessageCircle />
				<div>
					<h3>შენ გვერდით ვართ</h3>
					<p>დაგეხმარებით არჩევანში</p>
				</div>
			</Button>
		</section>
	);
}
