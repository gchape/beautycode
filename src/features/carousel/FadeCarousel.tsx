import { Carousel } from "react-bootstrap";
import "./FadeCarousel.css";

export default function FadeCarousel() {
  return (
    <Carousel interval={3000} className="carousel">
      {[1, 2, 3, 4, 5].map((i, index) => (
        <Carousel.Item key={index}>
          <picture>
            {/* Small screens - portrait images */}
            <source
              srcSet={`/slides/${i}-540.jpg 540w, 
                      /slides/${i}-810.jpg 810w, 
                      /slides/${i}-1080.jpg 1080w`}
              media="(max-width: 768px)"
            />
            {/* Larger screens - landscape images */}
            <source
              srcSet={`/slides/${i}-1440.jpg 1440w, 
                      /slides/${i}-1920.jpg 1920w, 
                      /slides/${i}-2400.jpg 2400w, 
                      /slides/${i}-2880.jpg 2880w`}
              media="(min-width: 769px)"
            />
            {/* Fallback image for older browsers or default */}
            <img
              src={`/slides/${i}-2400.jpg`}
              srcSet={`/slides/${i}-1440.jpg 1440w,
                       /slides/${i}-1920.jpg 1920w, 
                       /slides/${i}-2400.jpg 2400w, 
                       /slides/${i}-2880.jpg 2880w`}
              sizes="100vw"
              alt={`Slide ${i}`}
            />
          </picture>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
