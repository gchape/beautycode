import { Carousel } from "react-bootstrap";
import { generateSrcSet } from "../../app/api";

import "./FadeCarousel.css";

export default function FadeCarousel() {
  return (
    <Carousel interval={3000} className="carousel fade-carousel">
      {[1, 2, 3, 4, 5].map((id) => {
        const mobileId = `${id}-1080`;
        const desktopId = `${id}-1920`;

        return (
          <Carousel.Item key={id}>
            <picture>
              {/* Mobile Images */}
              <source
                media="(max-width: 480px)"
                srcSet={generateSrcSet(mobileId, [320, 375, 414, 480])}
                sizes="(max-width: 480px) 480px"
              />
              <source
                media="(max-width: 768px)"
                srcSet={generateSrcSet(mobileId, [600, 768])}
                sizes="(max-width: 768px) 768px"
              />
              <source
                media="(max-width: 1024px)"
                srcSet={generateSrcSet(mobileId, [800, 1024])}
                sizes="(max-width: 1024px) 1024px"
              />

              {/* Desktop Images */}
              <source
                media="(min-width: 769px)"
                srcSet={generateSrcSet(
                  desktopId,
                  [1024, 1280, 1366, 1440, 1600, 1920, 2560]
                )}
                sizes="(min-width: 769px) 100vw"
              />

              <img
                src={generateSrcSet(desktopId, [1920])}
                alt={`Slide ${id}`}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "top",
                }}
              />
            </picture>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
}
