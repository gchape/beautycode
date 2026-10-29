import { createFileRoute } from "@tanstack/react-router";
import { BrandStory } from "../components/home/brand-story.tsx";
import { CategoryShowcase } from "../components/home/category-showcase.tsx";
import { FeaturedProducts } from "../components/home/featured-products.tsx";
import { HomeHero } from "../components/home/home-hero.tsx";
import { ServiceBenefits } from "../components/home/service-benefits.tsx";
import { site } from "../data/site.ts";
import { absoluteUrl, seoHead } from "../lib/seo.ts";
import { getFeaturedProducts } from "../server/catalog.ts";

export const Route = createFileRoute("/")({
	loader: () => getFeaturedProducts(),
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
				telephone: site.phone.e164,
				email: site.email,
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
