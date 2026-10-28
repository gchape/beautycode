export function ProductFeatures({ features }: { features: string[] }) {
	if (!features.length) return null;
	return (
		<section
			className="mb-7 [&_ul]:list-disc [&_ul]:pl-[22px] [&_ul]:text-[0.9375rem] [&_ul]:text-muted-foreground [&_li+li]:mt-2"
			aria-label="მახასიათებლები"
		>
			<h2 className="mt-6 mb-3 text-base">მახასიათებლები</h2>
			<ul>
				{features.map((feature) => (
					<li key={feature}>{feature}</li>
				))}
			</ul>
		</section>
	);
}
