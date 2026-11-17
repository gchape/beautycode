import { Link } from "@tanstack/react-router";
import type { PublicProduct } from "../../data/catalog.ts";
import policies from "../../data/policies.json";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui/accordion.tsx";
import { ProductFeatures } from "./product-features.tsx";

export function ProductInformation({ product }: { product: PublicProduct }) {
	return (
		<div className="product-information">
			<h2 className="mb-3 text-subheading">აღწერა</h2>
			<p className="text-body whitespace-pre-line text-muted-foreground">
				{product.description}
			</p>
			<ProductFeatures features={product.features} />
			<Accordion
				type="multiple"
				className="**:data-[slot=accordion-item]:border-t **:data-[slot=accordion-item]:border-b-0 **:data-[slot=accordion-item]:border-border **:data-[slot=accordion-trigger]:py-5 **:data-[slot=accordion-trigger]:text-body **:data-[slot=accordion-trigger]:font-normal **:data-[slot=accordion-content]:text-body [&_a]:underline [&_p]:mt-4"
			>
				<AccordionItem value="delivery">
					<AccordionTrigger>მიწოდების პირობები</AccordionTrigger>
					<AccordionContent>
						{policies.delivery.paragraphs
							.filter(({ text }) => /ორი დღის|კურიერთან ნაღდი/.test(text))
							.map(({ text }) => (
								<p key={text}>{text}</p>
							))}
						<Link to="/delivery">მიწოდების სრული პირობები</Link>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="returns">
					<AccordionTrigger>დაბრუნების პირობები</AccordionTrigger>
					<AccordionContent>
						<p>დაბრუნებაზე ვრცელდება პირობები და გამონაკლისები.</p>
						<Link to="/returns">დაბრუნების სრული პირობები</Link>
					</AccordionContent>
				</AccordionItem>
			</Accordion>
		</div>
	);
}
