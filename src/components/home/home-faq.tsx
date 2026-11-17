import { Link } from "@tanstack/react-router";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../ui/accordion.tsx";

const questions = [
	{
		question: "რა პროდუქტებია Beauty Code-ში?",
		answer: (
			<p>
				ჩვენს{" "}
				<Link to="/products" search={{}}>
					კატალოგში
				</Link>{" "}
				დაგხვდება ეპილატორები, სახის, თმისა და პირის ღრუს მოვლის მოწყობილობები.
				პროდუქტის გვერდზე შეგიძლია გაეცნო აღწერას, მახასიათებლებს, ფასსა და
				მარაგის სტატუსს. არჩევანის გაკეთებაში ჩატით დაგეხმარებით.
			</p>
		),
	},
	{
		question: "როგორ შევუკვეთო პროდუქტი?",
		answer: (
			<p>
				აირჩიე სასურველი პროდუქტი და დააჭირე „შეკვეთა ჩატში“. ჩატში გამოგზავნილ
				შეტყობინებას მოჰყვება პროდუქტის სახელი, ფასი და ბმული. შეკვეთის დეტალებს
				ჩვენს გუნდთან მიმოწერით შეათანხმებ.
			</p>
		),
	},
	{
		question: "სად არის ხელმისაწვდომი მიწოდება?",
		answer: (
			<p>
				მიწოდება უფასოა საქართველოს მასშტაბით. შეკვეთამდე გაეცანი{" "}
				<Link to="/delivery">მიწოდების პირობებს</Link>, ხოლო შენს მისამართზე
				მიწოდების დეტალები ჩატში დააზუსტე.
			</p>
		),
	},
	{
		question: "სად ვნახო დაბრუნების პირობები?",
		answer: (
			<p>
				პროდუქტის დაბრუნების წესები და გამონაკლისები აღწერილია{" "}
				<Link to="/returns">დაბრუნების პირობებში</Link>. შეკვეთისა და დაბრუნების
				შესახებ კითხვების შემთხვევაში დაგვიკავშირდი საიტზე მითითებული ტელეფონით
				ან ჩატით.
			</p>
		),
	},
];

export function HomeFaq() {
	return (
		<section
			aria-labelledby="faq-title"
			className="site-container home-section mb-16 grid gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-16"
		>
			<div>
				<h2 id="faq-title" className="heading-section mb-3">
					ხშირად დასმული კითხვები
				</h2>
				<p className="text-body text-muted-foreground">
					ყველაფერი, რაც შეკვეთამდე უნდა იცოდე.
				</p>
			</div>
			<Accordion
				type="multiple"
				className="grid gap-3 [&_a]:underline [&_a]:underline-offset-4"
			>
				{questions.map(({ question, answer }) => (
					<AccordionItem
						key={question}
						value={question}
						className="rounded-2xl border border-border bg-background last:border-b data-[state=open]:border-[#d5b4c1]"
					>
						<AccordionTrigger className="min-h-16 items-center gap-3 px-4 py-4 text-body leading-relaxed hover:no-underline">
							{question}
						</AccordionTrigger>
						<AccordionContent className="mx-4 border-t border-border pt-3 pb-4 text-body leading-relaxed text-muted-foreground [&_p]:m-0">
							{answer}
						</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
		</section>
	);
}
