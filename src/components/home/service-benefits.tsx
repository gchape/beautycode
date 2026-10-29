import { Link } from "@tanstack/react-router";
import { MessageCircle, RotateCcw, Truck } from "lucide-react";
import { useOpenChat } from "../contact/contact-context.tsx";
import { Button } from "../ui/button.tsx";

export function ServiceBenefits() {
	const openChat = useOpenChat();
	return (
		<section
			className="grid grid-cols-3 gap-5 border-b border-border px-2.5 py-8.5 max-[800px]:gap-3 max-[560px]:grid-cols-1 max-[560px]:gap-5.5 max-[560px]:px-0 max-[560px]:py-6 mx-auto w-[min(1240px,calc(100%-80px))] max-[1100px]:w-[calc(100%-48px)] max-[560px]:w-[calc(100%-32px)]"
			aria-label="ჩვენი მომსახურება"
		>
			<Link
				className="flex items-center justify-center gap-4 bg-transparent text-left max-[800px]:gap-2.5 max-[560px]:justify-start max-[560px]:border-l-0 max-[560px]:pl-4 max-[560px]:gap-4"
				to="/delivery"
			>
				<Truck className="size-6.5 stroke-[1.2] max-[560px]:w-6.25" />
				<div>
					<p className="mb-1.25 text-[0.9375rem] max-[800px]:text-[0.8125rem] max-[560px]:text-[0.9375rem]">
						უფასო მიწოდება
					</p>
					<p className="m-0 text-[0.8125rem] text-muted-foreground max-[800px]:text-xs max-[560px]:text-[0.8125rem]">
						მთელ საქართველოში
					</p>
				</div>
			</Link>
			<Link
				className="border-l border-border flex items-center justify-center gap-4 bg-transparent text-left max-[800px]:gap-2.5 max-[560px]:justify-start max-[560px]:border-l-0 max-[560px]:pl-4 max-[560px]:gap-4"
				to="/returns"
			>
				<RotateCcw className="size-6.5 stroke-[1.2] max-[560px]:w-6.25" />
				<div>
					<p className="mb-1.25 text-[0.9375rem] max-[800px]:text-[0.8125rem] max-[560px]:text-[0.9375rem]">
						დაბრუნების შესაძლებლობა
					</p>
					<p className="m-0 text-[0.8125rem] text-muted-foreground max-[800px]:text-xs max-[560px]:text-[0.8125rem]">
						გაეცანი დაბრუნების პირობებს
					</p>
				</div>
			</Link>
			<Button
				className="rounded-none border-l border-border p-0 font-normal flex items-center justify-center gap-4 bg-transparent text-left max-[800px]:gap-2.5 max-[560px]:justify-start max-[560px]:border-l-0 max-[560px]:pl-4 max-[560px]:gap-4"
				variant="ghost"
				onClick={() => openChat()}
			>
				<MessageCircle className="size-6.5 stroke-[1.2] max-[560px]:w-6.25" />
				<div>
					<p className="mb-1.25 text-[0.9375rem] max-[800px]:text-[0.8125rem] max-[560px]:text-[0.9375rem]">
						შენ გვერდით ვართ
					</p>
					<p className="m-0 text-[0.8125rem] text-muted-foreground max-[800px]:text-xs max-[560px]:text-[0.8125rem]">
						დაგეხმარებით არჩევანში
					</p>
				</div>
			</Button>
		</section>
	);
}
