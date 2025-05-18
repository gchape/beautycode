import { Carousel, Image } from "react-bootstrap";
import "./FadeCarousel.css";
import { Link } from "react-router";

export default function FadeCarousel() {
  return (
    <Carousel fade className="fadeCarousel">
      <Carousel.Item>
        <div className="carouselImageWrapper">
          <Image
            src="https://images.unsplash.com/photo-1726137569914-ae2ad1c634f6?w=700&auto=format&fit=crop&q=60"
            alt="First slide"
            className="carouselImage"
          />
        </div>
        <Carousel.Caption className="carouselCaption">
          <h3 className="captionTitle">ფრანგული სუნამოები</h3>
          <Link to={"/"} className="captionText">
            გაიგე მეტი <span>{">"}</span>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <div className="carouselImageWrapper">
          <Image
            src="https://plus.unsplash.com/premium_photo-1747371476846-1af8fbc9f3c3?w=700&auto=format&fit=crop&q=60"
            alt="Second slide"
            className="carouselImage"
          />
        </div>
        <Carousel.Caption className="carouselCaption">
          <h3 className="captionTitle">ფრანგული სუნამოები</h3>
          <Link to={"/"} className="captionText">
            გაიგე მეტი <span>{">"}</span>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <div className="carouselImageWrapper">
          <Image
            src="https://plus.unsplash.com/premium_photo-1747135794838-a6afe928a90c?w=700&auto=format&fit=crop&q=60"
            alt="Third slide"
            className="carouselImage"
          />
        </div>
        <Carousel.Caption className="carouselCaption">
          <h3 className="captionTitle">ფრანგული სუნამოები</h3>
          <Link to={"/"} className="captionText">
            გაიგე მეტი <span>{">"}</span>
          </Link>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
