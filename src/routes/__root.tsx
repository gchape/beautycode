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
					<span className="block text-caption font-medium tracking-[0.13em] max-[560px]:text-xs">
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
				<script
					src="https://analytics.ahrefs.com/analytics.js"
					data-key="oNtEiR9nW9i/cN0SoaR8gA"
					async
				/>
			</head>
			<body>
				<a
					href="#main"
					className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-[70] focus:rounded-lg focus:bg-background focus:px-4 focus:py-3 focus:text-sm focus:shadow-lg"
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
