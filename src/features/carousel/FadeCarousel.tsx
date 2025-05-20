import { Carousel } from "react-bootstrap";
import { AdvancedImage } from "@cloudinary/react";
import { CloudinaryImage } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { slides } from "./slides";

import "./FadeCarousel.css";

export default function FadeCarousel() {
  return (
    <Carousel interval={3000} className="carousel">
      {slides.map(({ id, desktop, mobile }) => {
        const mobileImg = new CloudinaryImage(mobile.split("/upload/")[1], {
          cloudName: "de57eqbvb",
        }).resize(auto().width("auto"));

        const desktopImg = new CloudinaryImage(desktop.split("/upload/")[1], {
          cloudName: "de57eqbvb",
        }).resize(auto().width("auto"));

        return (
          <Carousel.Item key={id}>
            <picture>
              <source media="(max-width: 768px)" srcSet={mobileImg.toURL()} />
              <source media="(min-width: 769px)" srcSet={desktopImg.toURL()} />
              <AdvancedImage
                cldImg={desktopImg}
                alt={`Slide ${id}`}
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
