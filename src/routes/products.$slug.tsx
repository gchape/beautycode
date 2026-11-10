import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Banknote, Check, ShieldCheck, Truck } from "lucide-react";
import { Breadcrumb } from "../components/breadcrumb";
import { ProductFeatures } from "../components/catalog/product-features";
import { ProductGallery } from "../components/catalog/product-gallery";
import { ProductPrice } from "../components/catalog/product-price";
import { ChatButton } from "../components/contact/chat-button.tsx";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "../components/ui/accordion";
import { coverImage } from "../data/catalog.ts";
import { stockLabels } from "../data/labels.ts";
import policies from "../data/policies.json";
import {
	productHighlights,
	productWarranty,
} from "../lib/product-highlights.ts";
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
	const highlights = productHighlights(product);
	const warranty = productWarranty(product);
	return (
		<section className="site-container min-h-[60vh] pt-6 pb-12 [&>h1]:mt-4 [&>h1]:mb-6 [&>h1]:text-4xl max-[560px]:[&>h1]:text-3xl">
			<Breadcrumb title={product.name} />
			<div className="grid grid-cols-2 gap-12 [&_h1]:mt-3 [&_h1]:mb-4 [&_h1]:text-[2rem] max-[800px]:gap-7.5 max-[800px]:[&_h1]:text-[1.6875rem] max-[800px]:grid-cols-1 max-[560px]:gap-8.75">
				<ProductGallery key={product.id} product={product} />
				<div className="min-w-0 wrap-anywhere">
					<span className="block text-sm font-medium tracking-wide text-muted-foreground">
						{product.brand}
					</span>
					<h1>{product.name}</h1>
					<p className="mb-3 text-sm font-medium">
						{stockLabels[product.stock_status]}
					</p>
					<ProductPrice product={product} className="mb-5 text-3xl" />
					{highlights.length > 0 && (
						<ul className="mb-6 space-y-2 text-base leading-relaxed">
							{highlights.map((feature) => (
								<li key={feature} className="flex items-start gap-3">
									<Check
										className="mt-1 shrink-0 text-ring"
										size={17}
										aria-hidden="true"
									/>
									<span>{feature}</span>
								</li>
							))}
						</ul>
					)}
					<ChatButton
						product={product}
						className="w-full min-h-13 text-base"
						disabled={product.stock_status === "out_of_stock"}
					>
						შეკვეთა ჩატში
					</ChatButton>
					<p className="mt-3 text-sm text-muted-foreground">
						შეკვეთის დეტალებს ჩატში შევათანხმებთ.
					</p>
					<div className="my-6 grid gap-4 rounded-xl border border-border bg-muted/50 p-4 text-sm leading-relaxed">
						<Link
							to="/delivery"
							className="flex items-start gap-3 rounded-md hover:underline"
						>
							<Truck size={19} className="mt-0.5 shrink-0" aria-hidden="true" />
							<span>უფასო მიწოდება მთელ საქართველოში</span>
						</Link>
						<div className="flex items-start gap-3">
							<Banknote
								size={19}
								className="mt-0.5 shrink-0"
								aria-hidden="true"
							/>
							<span>გადარიცხვა ან კურიერთან ნაღდი ანგარიშსწორება</span>
						</div>
						{warranty && (
							<Link
								to="/returns"
								className="flex items-start gap-3 rounded-md hover:underline"
							>
								<ShieldCheck
									size={19}
									className="mt-0.5 shrink-0"
									aria-hidden="true"
								/>
								<span>{warranty}</span>
							</Link>
						)}
					</div>
					<h2 className="mt-8 mb-3 text-xl">აღწერა</h2>
					<p className="text-base whitespace-pre-line text-muted-foreground">
						{product.description}
					</p>
					<ProductFeatures features={product.features ?? []} />
					<Accordion
						type="multiple"
						className="**:data-[slot=accordion-item]:border-t **:data-[slot=accordion-item]:border-b-0 **:data-[slot=accordion-item]:border-border **:data-[slot=accordion-trigger]:py-5 **:data-[slot=accordion-trigger]:text-[0.9375rem] **:data-[slot=accordion-trigger]:font-normal **:data-[slot=accordion-content]:text-[0.9375rem] [&_a]:underline [&_p]:mt-3.75"
					>
						<AccordionItem value="delivery">
							<AccordionTrigger>მიწოდების პირობები</AccordionTrigger>
							<AccordionContent>
								{policies.delivery.paragraphs
									.filter(({ text }) => /ორი დღის|კურიერთან ნაღდი/.test(text))
									.map(({ text }) => (
										<p key={text}>{text}</p>
									))}
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
			<div className="product-purchase-bar">
				<div className="flex items-center justify-between gap-3">
					<ProductPrice product={product} className="m-0 text-lg" />
					<ChatButton
						product={product}
						className="min-h-11 gap-2 px-4 text-sm"
						disabled={product.stock_status === "out_of_stock"}
					>
						შეკვეთა
					</ChatButton>
				</div>
			</div>
		</section>
	);
}
