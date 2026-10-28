import { createFileRoute } from "@tanstack/react-router";
import { BrandStory } from "../components/home/brand-story";
import { CategoryShowcase } from "../components/home/category-showcase";
import { FeaturedProducts } from "../components/home/featured-products";
import { HomeHero } from "../components/home/home-hero";
import { ServiceBenefits } from "../components/home/service-benefits";
import { absoluteUrl, seoHead } from "../lib/seo";
import { getProducts } from "../server/catalog";
export const Route = createFileRoute("/")({
	loader: () => getProducts({ data: {} }),
	component: Home,
	head: () =>
		seoHead({
			title: "სილამაზე შენებურად",
			description:
				"ეპილატორები, სახის, თმისა და პირის ღრუს მოვლის მოწყობილობები. უფასო მიწოდება საქართველოში.",
			path: "/",
			data: {
				"@context": "https://schema.org",
				"@type": "Organization",
				name: "Beauty Code",
				url: absoluteUrl("/"),
				logo: absoluteUrl("/logo.jpg"),
				telephone: "+995574074833",
				email: "13beautycode@gmail.com",
			},
		}),
});
function Home() {
	const products = Route.useLoaderData();
	return (
		<>
			<HomeHero />
			<ServiceBenefits />
			<CategoryShowcase />
			<FeaturedProducts products={products} />
			<BrandStory />
		</>
	);
}
