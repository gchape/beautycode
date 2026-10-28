import { ArrowUpRight } from "lucide-react";
import { Button } from "../ui/button";
import { useContact } from "./contact-context";

export function ContactButton() {
	const contact = useContact();
	return (
		<Button variant="outline" onClick={() => contact()}>
			დაგვიკავშირდი <ArrowUpRight size={16} />
		</Button>
	);
}
