import { Carousel, Card, Button } from "react-bootstrap";
import type { Product } from "../../app/types";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./FadeCarousel.css";

type FadeCarouselProps = {
  products: Product[];
};

export default function FadeCarousel({ products }: FadeCarouselProps) {
  return (
    <Carousel interval={10_000} className="carousel fade-carousel">
      {products.map(({ id, oldPrice, newPrice, discount }) => (
        <Carousel.Item key={id}>
          <div className="carousel-card-wrapper">
            <Card className="carousel-card">
              <Card.Img
                variant="top"
                src={`/${id}.svg`}
                className="carousel-card-img"
              />

              <Card.Body className="carousel-card-body d-flex justify-content-center align-items-center gap-3 positon-relative">
                <Card.Text className="carousel-card-text d-flex gap-1 m-0">
                  <span className="text-muted text-decoration-line-through h5 m-0">
                    ₾{oldPrice}
                  </span>
                  <span className="fw-normal discounted h5 m-0">
                    ₾{newPrice}
                  </span>
                </Card.Text>
                <span className="discount-badge">-{discount}%</span>{" "}
                <div className="order-button-wrapper position-relative d-inline-block">
                  <Button
                    className="carousel-card-order d-flex justify-content-center align-items-center"
                    href="https://m.me/Beatlovegeorgia"
                  >
                    <FontAwesomeIcon icon={faArrowRight} className="icon" />
                  </Button>
                  <div className="order-label">
                    <span className="label-text">შეუკვეთე აქ</span>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
