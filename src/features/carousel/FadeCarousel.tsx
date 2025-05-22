import { Carousel } from "react-bootstrap";
import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { dpr } from "@cloudinary/url-gen/actions/delivery";

import { slides } from "./slides";
import "./FadeCarousel.css";

const generateSrcSet = (
  publicId: string,
  cloudName: string,
  widths: number[]
) =>
  widths
    .map((w) => {
      const img = new CloudinaryImage(publicId, { cloudName })
        .resize(fill().width(w))
        .format("auto")
        .quality("auto")
        .delivery(dpr("auto"));
      return `${img.toURL()} ${w}w`;
    })
    .join(", ");

export default function FadeCarousel() {
  return (
    <Carousel interval={3000} className="carousel fade-carousel">
      {slides.map(({ id, desktop, mobile }) => {
        const mobilePublicId = mobile.split("/upload/")[1];
        const desktopPublicId = desktop.split("/upload/")[1];

        const desktopImg = new CloudinaryImage(desktopPublicId, {
          cloudName: "de57eqbvb",
        })
          .format("auto")
          .quality("auto");

        return (
          <Carousel.Item key={id}>
            <picture>
              <source
                media="(max-width: 768px)"
                srcSet={generateSrcSet(
                  mobilePublicId,
                  "de57eqbvb",
                  [320, 375, 414, 480, 600, 768]
                )}
              />
              <source
                media="(min-width: 769px)"
                srcSet={generateSrcSet(
                  desktopPublicId,
                  "de57eqbvb",
                  [800, 1024, 1280, 1366, 1440, 1600, 1920, 2560]
                )}
              />
              <AdvancedImage
                cldImg={desktopImg}
                alt={`Slide ${id}`}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </picture>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}
