// Keep stored catalog URLs stable while serving smaller bundled images.
const bundledImages = new Set(
	[
		"face-cleanser",
		"face-massager",
		"ipl-colors",
		"ipl-kit",
		"oral-irrigator",
		"scalp-massager",
	].map((name) => `/images/${name}-cutout.png`),
);

export function productImageProps(src: string, sizes: string) {
	if (!bundledImages.has(src)) return { src };
	const base = src.slice(0, -4);
	return {
		src: `${base}-800.webp`,
		srcSet: `${base}-400.webp 400w, ${base}-800.webp 800w`,
		sizes,
	};
}
