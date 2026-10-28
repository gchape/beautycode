export const imageTypes = {
	"image/webp": "webp",
	"image/png": "png",
	"image/jpeg": "jpg",
} as const;

export type ImageType = keyof typeof imageTypes;

export const imageTypeNames = Object.keys(imageTypes) as [
	ImageType,
	...ImageType[],
];

export const maxImageUploadBytes = 5 * 1024 * 1024;
export const maxSourceImageBytes = 20 * 1024 * 1024;
export const maxImagesPerProduct = 12;
