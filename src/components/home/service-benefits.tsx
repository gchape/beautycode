import { Link } from "@tanstack/react-router";
import { MessageCircle, RotateCcw, Truck } from "lucide-react";
import { useOpenChat } from "../contact/contact-context.tsx";

export function ServiceBenefits() {
	const openChat = useOpenChat();
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
			<button type="button" className="home-benefit" onClick={() => openChat()}>
				<MessageCircle aria-hidden="true" />
				<span>
					შენ გვერდით ვართ<small>დაგეხმარებით არჩევანში</small>
				</span>
			</button>
		</section>
	);
}
