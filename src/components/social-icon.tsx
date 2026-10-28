export function SocialIcon({
	name,
}: {
	name: "Facebook" | "Instagram" | "TikTok";
}) {
	return (
		<svg
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="currentColor"
			aria-hidden="true"
			focusable="false"
		>
			{name === "Facebook" && (
				<path d="M14 22v-9h3l.5-4H14V7c0-1.2.4-2 2-2h2V1.4C17.2 1.2 16 1 14.8 1 11.5 1 10 3 10 6.5V9H7v4h3v9z" />
			)}
			{name === "Instagram" && (
				<g fill="none" stroke="currentColor" strokeWidth="1.8">
					<rect x="3" y="3" width="18" height="18" rx="5" />
					<circle cx="12" cy="12" r="4" />
					<circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
				</g>
			)}
			{name === "TikTok" && (
				<path d="M16.5 2h-3.4v13.4a3.1 3.1 0 1 1-2.7-3.1V8.9a6.5 6.5 0 1 0 6.1 6.5V8.7a9 9 0 0 0 5.2 1.6V6.9A5.3 5.3 0 0 1 16.5 2Z" />
			)}
		</svg>
	);
}
