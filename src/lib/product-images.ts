import { Cloudinary } from "@cloudinary/url-gen";
import { scale } from "@cloudinary/url-gen/actions/resize";

// Only original unsigned upload URLs are transformed. Preserve other URLs as-is.
function parseCloudinaryImage(src: string) {
	const match =
		/^https:\/\/res\.cloudinary\.com\/([\w-]+)\/image\/upload\/(?:v(\d+)\/)?([^?#,]+)$/.exec(
			src,
		);
	if (!match) return null;
	const [, cloudName, version, publicId] = match;
	if (/^(?:s--|(?:c|w|h|f|q|e|t|a|ar|dpr)_)/.test(publicId)) return null;
	return { cloudName, version, publicId };
}

function imageUrl(
	image: NonNullable<ReturnType<typeof parseCloudinaryImage>>,
	width: number,
	format: "auto" | "jpg",
) {
	const asset = new Cloudinary({
		cloud: { cloudName: image.cloudName },
		url: { secure: true, analytics: false },
	})
		.image(image.publicId)
		.resize(scale().width(width))
		.format(format)
		.quality("auto");
	if (image.version) asset.setVersion(image.version);
	return asset.toURL();
}

/** Shared by responsive images and social previews. */
export function cloudinaryUrl(
	src: string,
	width: number,
	format: "auto" | "jpg" = "auto",
) {
	const image = parseCloudinaryImage(src);
	return image ? imageUrl(image, width, format) : src;
}

export function productImageProps(
	src: string,
	sizes: string,
	variant: "product" | "thumbnail" = "product",
) {
	const image = parseCloudinaryImage(src);
	if (!image) return { src };
	const widths =
		variant === "thumbnail"
			? [80, 160]
			: [160, 240, 320, 400, 480, 640, 800, 960, 1200];
	return {
		src: imageUrl(image, variant === "thumbnail" ? 160 : 800, "auto"),
		srcSet: widths
			.map((width) => `${imageUrl(image, width, "auto")} ${width}w`)
			.join(", "),
		sizes,
	};
}
