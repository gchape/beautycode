import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button.tsx";
import { useOpenChat } from "./contact-context.tsx";

export function ContactButton() {
	const openChat = useOpenChat();
	return (
		<Button variant="outline" onClick={() => openChat()}>
			დაგვიკავშირდი <ArrowUpRight size={16} />
		</Button>
	);
}
