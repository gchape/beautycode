import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { useOpenChat } from "../contact/contact-context.tsx";
import { Button } from "../ui/button.tsx";

export function HomeHero() {
	const openChat = useOpenChat();
	return (
		<section
			className="site-container home-hero max-sm:mt-4"
			aria-labelledby="hero-title"
		>
			<div className="flex flex-col items-center justify-center px-6 py-10 text-center sm:px-10 sm:py-14">
				<h1
					id="hero-title"
					className="mb-5 max-w-3xl text-[clamp(2rem,3.8vw,3.25rem)] leading-[1.35] tracking-tight text-balance"
				>
					შენი მოვლა, <br className="sm:hidden" />
					<span className="text-[#986074]">შენს რიტმში.</span>
				</h1>
				<p className="mb-8 max-w-xl text-sm leading-8 text-muted-foreground sm:text-base">
					სახის, სხეულისა და თმის მოვლის მოწყობილობები. შეარჩიე ის, რაც შენს
					ყოველდღიურობას უფრო მარტივს გახდის.
				</p>
				<div className="flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row sm:gap-5">
					<Button asChild size="lg" className="w-full sm:w-auto">
						<Link to="/products" search={{}}>
							ყველა პროდუქტი <ArrowRight size={18} aria-hidden="true" />
						</Link>
					</Button>
					<Button
						variant="ghost"
						onClick={() => openChat()}
						className="w-full px-2 text-sm sm:w-auto"
					>
						<MessageCircle size={18} aria-hidden="true" /> დაგეხმარებით
						არჩევანში
					</Button>
				</div>
			</div>
		</section>
	);
}
