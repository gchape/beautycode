import { dpr } from "@cloudinary/url-gen/actions/delivery";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { Cloudinary } from "@cloudinary/url-gen/index";

// Initialize Cloudinary instance
const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUD_NAME,
  },
});

// Generates a srcSet string for a single publicId with specified widths
export const generateSrcSet = (publicId: string, widths: number[]) =>
  widths
    .map((w) => {
      const cldImg = cld.image(publicId);
      cldImg
        .resize(fill().width(w))
        .format("auto")
        .quality("auto")
        .delivery(dpr("auto"));
      return `${cldImg.toURL()} ${w}w`;
    })
    .join(", ");
