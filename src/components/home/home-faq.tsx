import { Link } from "@tanstack/react-router";

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
				<p className="text-sm text-muted-foreground">
					ყველაფერი, რაც შეკვეთამდე უნდა იცოდე.
				</p>
			</div>
			<div className="divide-y divide-border border-t border-border [&_details]:py-5 [&_summary]:cursor-pointer [&_summary]:font-medium [&_p]:mt-3 [&_p]:leading-8 [&_p]:text-muted-foreground [&_a]:underline">
				<details>
					<summary>რა პროდუქტებია Beauty Code-ში?</summary>
					<p>
						ჩვენს{" "}
						<Link to="/products" search={{}}>
							კატალოგში
						</Link>{" "}
						დაგხვდება ეპილატორები, სახის, თმისა და პირის ღრუს მოვლის
						მოწყობილობები. პროდუქტის გვერდზე შეგიძლია გაეცნო აღწერას,
						მახასიათებლებს, ფასსა და მარაგის სტატუსს. არჩევანის გაკეთებაში ჩატით
						დაგეხმარებით.
					</p>
				</details>
				<details>
					<summary>როგორ შევუკვეთო პროდუქტი?</summary>
					<p>
						აირჩიე სასურველი პროდუქტი და დააჭირე „შეკვეთა ჩატში“. ჩატში
						გამოგზავნილ შეტყობინებას მოჰყვება პროდუქტის სახელი, ფასი და ბმული.
						შეკვეთის დეტალებს ჩვენს გუნდთან მიმოწერით შეათანხმებ.
					</p>
				</details>
				<details>
					<summary>სად არის ხელმისაწვდომი მიწოდება?</summary>
					<p>
						მიწოდება უფასოა საქართველოს მასშტაბით. შეკვეთამდე გაეცანი{" "}
						<Link to="/delivery">მიწოდების პირობებს</Link>, ხოლო შენს მისამართზე
						მიწოდების დეტალები ჩატში დააზუსტე.
					</p>
				</details>
				<details>
					<summary>სად ვნახო დაბრუნების პირობები?</summary>
					<p>
						პროდუქტის დაბრუნების წესები და გამონაკლისები აღწერილია{" "}
						<Link to="/returns">დაბრუნების პირობებში</Link>. შეკვეთისა და
						დაბრუნების შესახებ კითხვების შემთხვევაში დაგვიკავშირდი საიტზე
						მითითებული ტელეფონით ან ჩატით.
					</p>
				</details>
			</div>
		</section>
	);
}
