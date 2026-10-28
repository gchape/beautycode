import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Link,
	Scripts,
} from "@tanstack/react-router";
import { CategoryProvider } from "../components/catalog/category-context";
import { Storefront } from "../components/storefront";
import { Button } from "../components/ui/button";
import { getCategories } from "../server/catalog";
import appCss from "../styles.css?url";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
	{
		loader: () => getCategories(),
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
			<section className="wrap empty-state">
				<span className="eyebrow">404</span>
				<h1>გვერდი ვერ მოიძებნა</h1>
				<Button asChild>
					<Link to="/">მთავარ გვერდზე დაბრუნება</Link>
				</Button>
			</section>
		),
		errorComponent: ({ reset }) => (
			<section className="wrap empty-state">
				<h1>გვერდი ვერ ჩაიტვირთა</h1>
				<p>გთხოვთ, სცადოთ ხელახლა.</p>
				<Button onClick={reset}>ხელახლა ცდა</Button>
			</section>
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
				<a href="#main" className="skip-link">
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
