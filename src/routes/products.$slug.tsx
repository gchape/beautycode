import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MessageCircle, Truck } from "lucide-react";
import { useOpenChat } from "#/components/contact/contact-context.tsx";
import { Breadcrumb } from "../components/breadcrumb";
import { ProductFeatures } from "../components/catalog/product-features";
import { ProductGallery } from "../components/catalog/product-gallery";
import { ProductPrice } from "../components/catalog/product-price";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../components/ui/accordion";
import { Button } from "../components/ui/button";
import { coverImage } from "../data/catalog.ts";
import { stockLabels } from "../data/labels.ts";
import { breadcrumbData, productData, productPath, seoHead } from "../lib/seo";
import { getProduct } from "../server/catalog";

export const Route = createFileRoute("/products/$slug")({
	loader: async ({ params }) => {
		const product = await getProduct({ data: { slug: params.slug } });
		if (!product) throw notFound();
		return product;
	},
	head: ({ loaderData: product }) =>
		product
			? seoHead({
					title: product.name,
					description:
						product.meta_description || product.description.slice(0, 180),
					path: productPath(product.slug),
					image: coverImage(product) || undefined,
					data: [
						productData(product),
						breadcrumbData([
							{ name: "მთავარი", path: "/" },
							{ name: "პროდუქტები", path: "/products" },
							{ name: product.name, path: productPath(product.slug) },
						]),
					],
				})
			: {},
	component: ProductPage,
});

function ProductPage() {
	const product = Route.useLoaderData();
	const openChat = useOpenChat();
	return (
		<section className="mx-auto w-[min(1240px,calc(100%-80px))] max-[1100px]:w-[calc(100%-48px)] max-[560px]:w-[calc(100%-32px)] min-h-[60vh] pt-[25px] pb-20 [&>h1]:mt-4 [&>h1]:mb-6 [&>h1]:text-4xl max-[560px]:[&>h1]:text-3xl">
			<Breadcrumb title={product.name} />
			<div className="grid grid-cols-2 gap-[65px] [&_h1]:my-5 [&_h1]:text-[2rem] max-[800px]:gap-[30px] max-[800px]:[&_h1]:text-[1.6875rem] max-[560px]:grid-cols-1 max-[560px]:gap-[35px]">
				<ProductGallery key={product.id} product={product} />
				<div>
					<span className="block text-[0.8125rem] font-medium tracking-[0.13em] max-[560px]:text-xs">
						{product.brand}
					</span>
					<h1>{product.name}</h1>
					<p className="text-[0.9375rem]">
						{stockLabels[product.stock_status]}
					</p>
					<ProductPrice product={product} className="text-3xl" />
					<h2 className="mt-6 mb-3 text-base">აღწერა</h2>
					<p className="text-base whitespace-pre-line text-muted-foreground">
						{product.description}
					</p>
					<ProductFeatures features={product.features ?? []} />
					<Button
						disabled={product.stock_status === "out_of_stock"}
						onClick={() => openChat(product)}
					>
						<MessageCircle size={19} />
						შეკვეთა / კონსულტაცია
					</Button>
					<p className="my-[25px] flex flex-wrap items-center gap-2.5 text-sm">
						<Truck size={18} />
						უფასო მიწოდება მთელ საქართველოში
					</p>
					<Accordion
						type="multiple"
						className="[&_[data-slot=accordion-item]]:border-t [&_[data-slot=accordion-item]]:border-b-0 [&_[data-slot=accordion-item]]:border-border [&_[data-slot=accordion-trigger]]:py-5 [&_[data-slot=accordion-trigger]]:text-[0.9375rem] [&_[data-slot=accordion-trigger]]:font-normal [&_[data-slot=accordion-content]]:text-[0.9375rem] [&_a]:underline [&_p]:mt-[15px]"
					>
						<AccordionItem value="delivery">
							<AccordionTrigger>მიწოდების პირობები</AccordionTrigger>
							<AccordionContent>
								<p>გაეცანი შეკვეთის დამუშავებისა და მიწოდების ვადებს.</p>
								<Link to="/delivery">მიწოდების სრული პირობები</Link>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="returns">
							<AccordionTrigger>დაბრუნების პირობები</AccordionTrigger>
							<AccordionContent>
								<p>დაბრუნებაზე ვრცელდება პირობები და გამონაკლისები.</p>
								<Link to="/returns">დაბრუნების სრული პირობები</Link>
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</div>
		</section>
	);
}
