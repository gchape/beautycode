import georgianFont from "@fontsource-variable/noto-sans-georgian/files/noto-sans-georgian-georgian-wght-normal.woff2?url";
import latinExtFont from "@fontsource-variable/noto-sans-georgian/files/noto-sans-georgian-latin-ext-wght-normal.woff2?url";
import latinFont from "@fontsource-variable/noto-sans-georgian/files/noto-sans-georgian-latin-wght-normal.woff2?url";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Link,
	Scripts,
} from "@tanstack/react-router";
import { CategoryProvider } from "../components/catalog/category-context.tsx";
import { Storefront } from "../components/storefront.tsx";
import { Button } from "../components/ui/button.tsx";
import { Card } from "../components/ui/card.tsx";
import { categoriesQuery } from "../lib/catalog-queries.ts";
import appCss from "../styles.css?url";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
	{
		loader: ({ context }) => context.queryClient.fetchQuery(categoriesQuery),
		head: () => ({
			meta: [
				{ charSet: "utf-8" },
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{ title: "Beauty Code | სილამაზე შენებურად" },
				{
					name: "description",
					content:
						"ეპილატორები, სახის, თმისა და პირის ღრუს მოვლის მოწყობილობები. Beauty Code. უფასო მიწოდება მთელ საქართველოში.",
				},
			],
			links: [
				...[georgianFont, latinFont, latinExtFont].map((href) => ({
					rel: "preload",
					href,
					as: "font",
					type: "font/woff2",
					crossOrigin: "anonymous" as const,
				})),
				{ rel: "stylesheet", href: appCss },
				{ rel: "icon", href: "/favicon.ico", sizes: "16x16 32x32 48x48" },
				{
					rel: "icon",
					type: "image/png",
					href: "/favicon.png",
					sizes: "256x256",
				},
				{
					rel: "apple-touch-icon",
					href: "/apple-touch-icon.png",
					sizes: "180x180",
				},
			],
		}),
		shellComponent: RootDocument,

		notFoundComponent: () => (
			<Card asChild variant="empty" className="site-container">
				<section>
					<span className="block text-[0.8125rem] font-medium tracking-[0.13em] max-[560px]:text-xs">
						404
					</span>
					<h1>გვერდი ვერ მოიძებნა</h1>
					<Button asChild>
						<Link to="/">მთავარ გვერდზე დაბრუნება</Link>
					</Button>
				</section>
			</Card>
		),
		errorComponent: ({ reset }) => (
			<Card asChild variant="empty" className="site-container">
				<section>
					<h1>გვერდი ვერ ჩაიტვირთა</h1>
					<p>გთხოვთ, სცადოთ ხელახლა.</p>
					<Button onClick={reset}>ხელახლა ცდა</Button>
				</section>
			</Card>
		),
	},
);

function RootDocument({ children }: { children: React.ReactNode }) {
	const categories = Route.useLoaderData() ?? [];
	return (
		<html lang="ka">
			<head>
				<HeadContent />
			</head>
			<body>
				<a
					href="#main"
					className="fixed -top-25 left-3.75 z-10 bg-white p-3 focus:top-2.5"
				>
					მთავარ შინაარსზე გადასვლა
				</a>
				<CategoryProvider categories={categories}>
					<Storefront>{children}</Storefront>
				</CategoryProvider>
				<Scripts />
			</body>
		</html>
	);
}
