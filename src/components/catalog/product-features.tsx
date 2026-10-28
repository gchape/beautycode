export function ProductFeatures({ features }: { features: string[] }) {
	if (!features.length) return null;
	return (
		<section className="product-features" aria-label="მახასიათებლები">
			<h2 className="product-section-title">მახასიათებლები</h2>
			<ul>
				{features.map((feature) => (
					<li key={feature}>{feature}</li>
				))}
			</ul>
		</section>
	);
}
