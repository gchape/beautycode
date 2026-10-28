import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { MessageCircle, Truck } from "lucide-react";
import { Breadcrumb } from "../components/breadcrumb";
import { ProductFeatures } from "../components/catalog/product-features";
import { ProductGallery } from "../components/catalog/product-gallery";
import { ProductPrice } from "../components/catalog/product-price";
import { useContact } from "../components/contact/contact-context";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../components/ui/accordion";
import { Button } from "../components/ui/button";
import { breadcrumbData, productData, productPath, seoHead } from "../lib/seo";
import { getProducts } from "../server/catalog";

export const Route = createFileRoute("/products/$slug")({
	loader: async ({ params }) => {
		const products = await getProducts({ data: {} });
		const product = products.find((p) => p.slug === params.slug);
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
					image: product.image_url || undefined,
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
	const p = Route.useLoaderData(),
		contact = useContact();
	return (
		<section className="wrap page-section">
			<Breadcrumb title={p.name} />
			<div className="product-detail">
				<ProductGallery key={p.id} product={p} />
				<div>
					<span className="eyebrow">{p.brand}</span>
					<h1>{p.name}</h1>
					<p className="stock">
						{p.stock_status === "in_stock"
							? "მარაგშია"
							: p.stock_status === "preorder"
								? "წინასწარი შეკვეთა"
								: "არ არის მარაგში"}
					</p>
					<ProductPrice product={p} className="detail-price" />
					<h2 className="product-section-title">აღწერა</h2>
					<p className="product-description">{p.description}</p>
					<ProductFeatures features={p.features ?? []} />
					<Button
						disabled={p.stock_status === "out_of_stock"}
						onClick={() => contact(p)}
					>
						<MessageCircle size={19} />
						შეკვეთა / კონსულტაცია
					</Button>
					<p className="delivery-note">
						<Truck size={18} />
						უფასო მიწოდება მთელ საქართველოში
					</p>
					<Accordion type="multiple" className="product-accordion">
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
