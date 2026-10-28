import { Link } from "@tanstack/react-router";
import { MessageCircle, RotateCcw, Truck } from "lucide-react";
import { useOpenChat } from "../contact/contact-context.tsx";
import { Button } from "../ui/button.tsx";

export function ServiceBenefits() {
	const openChat = useOpenChat();
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
			<Button variant="ghost" onClick={() => openChat()}>
				<MessageCircle />
				<div>
					<h3>შენ გვერდით ვართ</h3>
					<p>დაგეხმარებით არჩევანში</p>
				</div>
			</Button>
		</section>
	);
}
