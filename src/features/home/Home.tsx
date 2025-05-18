import { Container } from "react-bootstrap";
import FadeCarousel from "../carousel/FadeCarousel";

export default function Home() {
  return (
    <Container className="d-flex justify-content-center align-items-center">
      <FadeCarousel />
    </Container>
  );
}
