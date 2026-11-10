import { LoaderCircle, MessageCircle } from "lucide-react";
import type { ComponentProps } from "react";
import type { PublicProduct } from "../../data/catalog.ts";
import { Button } from "../ui/button.tsx";
import { useChatPending, useOpenChat } from "./contact-context.tsx";

export function ChatButton({
	product,
	children,
	disabled,
	onClick,
	...props
}: Omit<ComponentProps<typeof Button>, "asChild"> & {
	product?: PublicProduct;
}) {
	const openChat = useOpenChat();
	const pending = useChatPending();
	const busy = pending === (product?.slug ?? "general");
	return (
		<Button
			{...props}
			disabled={disabled || pending !== null}
			aria-busy={busy}
			onClick={(event) => {
				onClick?.(event);
				if (!event.defaultPrevented) openChat(product);
			}}
		>
			{busy ? (
				<LoaderCircle
					size={18}
					className="motion-safe:animate-spin"
					aria-hidden="true"
				/>
			) : (
				<MessageCircle size={18} aria-hidden="true" />
			)}
			{busy ? "ვუკავშირდებით…" : children}
		</Button>
	);
}
