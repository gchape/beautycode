import { Link } from "@tanstack/react-router";
import { DisclosureIndicator } from "./disclosure-indicator.tsx";

export function HomeFaq() {
	return (
		<section
			aria-labelledby="faq-title"
			className="site-container home-section mb-16 grid gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-16"
		>
			<div>
				<h2
					id="faq-title"
					className="mb-3 text-2xl leading-relaxed sm:text-3xl"
				>
					ხშირად დასმული კითხვები
				</h2>
				<p className="text-base text-muted-foreground">
					ყველაფერი, რაც შეკვეთამდე უნდა იცოდე.
				</p>
			</div>
			<div className="grid gap-3 [&_a]:underline [&_a]:underline-offset-4">
				<details className="home-disclosure">
					<summary>
						<span>რა პროდუქტებია Beauty Code-ში?</span>
						<DisclosureIndicator />
					</summary>
					<div className="disclosure-content">
						<p>
							ჩვენს{" "}
							<Link to="/products" search={{}}>
								კატალოგში
							</Link>{" "}
							დაგხვდება ეპილატორები, სახის, თმისა და პირის ღრუს მოვლის
							მოწყობილობები. პროდუქტის გვერდზე შეგიძლია გაეცნო აღწერას,
							მახასიათებლებს, ფასსა და მარაგის სტატუსს. არჩევანის გაკეთებაში
							ჩატით დაგეხმარებით.
						</p>
					</div>
				</details>
				<details className="home-disclosure">
					<summary>
						<span>როგორ შევუკვეთო პროდუქტი?</span>
						<DisclosureIndicator />
					</summary>
					<div className="disclosure-content">
						<p>
							აირჩიე სასურველი პროდუქტი და დააჭირე „შეკვეთა ჩატში“. ჩატში
							გამოგზავნილ შეტყობინებას მოჰყვება პროდუქტის სახელი, ფასი და ბმული.
							შეკვეთის დეტალებს ჩვენს გუნდთან მიმოწერით შეათანხმებ.
						</p>
					</div>
				</details>
				<details className="home-disclosure">
					<summary>
						<span>სად არის ხელმისაწვდომი მიწოდება?</span>
						<DisclosureIndicator />
					</summary>
					<div className="disclosure-content">
						<p>
							მიწოდება უფასოა საქართველოს მასშტაბით. შეკვეთამდე გაეცანი{" "}
							<Link to="/delivery">მიწოდების პირობებს</Link>, ხოლო შენს
							მისამართზე მიწოდების დეტალები ჩატში დააზუსტე.
						</p>
					</div>
				</details>
				<details className="home-disclosure">
					<summary>
						<span>სად ვნახო დაბრუნების პირობები?</span>
						<DisclosureIndicator />
					</summary>
					<div className="disclosure-content">
						<p>
							პროდუქტის დაბრუნების წესები და გამონაკლისები აღწერილია{" "}
							<Link to="/returns">დაბრუნების პირობებში</Link>. შეკვეთისა და
							დაბრუნების შესახებ კითხვების შემთხვევაში დაგვიკავშირდი საიტზე
							მითითებული ტელეფონით ან ჩატით.
						</p>
					</div>
				</details>
			</div>
		</section>
	);
}
