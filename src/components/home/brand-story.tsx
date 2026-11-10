import { ChatButton } from "../contact/chat-button.tsx";

export function BrandStory() {
	return (
		<section className="site-container home-section">
			<div className="grid gap-8 rounded-xl bg-rose-surface px-6 py-10 sm:p-10 lg:grid-cols-2 lg:gap-16 lg:p-14">
				<div>
					<h2 className="m-0 text-2xl leading-relaxed sm:text-3xl">
						ზრუნვას არ სჭირდება
						<br />
						განსაკუთრებული მიზეზი.
					</h2>
				</div>
				<div className="flex flex-col items-start justify-center">
					<p className="mb-6 text-base leading-relaxed text-muted-foreground">
						ჩვენ გვჯერა პატარა, ყოველდღიური რიტუალების. თუ ჯერ არ იცი, რომელი
						მოწყობილობა შეგეფერება, მოგვწერე. ერთად შევარჩიოთ ის, რაც შენ
						გჭირდება.
					</p>
					<ChatButton variant="outline">დაგეხმარებით არჩევანში</ChatButton>
				</div>
			</div>
		</section>
	);
}
