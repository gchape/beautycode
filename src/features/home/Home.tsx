import { Container } from "react-bootstrap";
import FadeCarousel from "../carousel/FadeCarousel";
import Products from "../products/Products";

export default function Home() {
  return (
    <Container fluid className="mx-0 px-0">
      <FadeCarousel />

      <div className="d-block text-center my-5">
        <h3>
          {/* #e6bfc4 */}
          ყველაზე <span style={{ color: "#cfa67b" }}>გაყიდვადი</span>
        </h3>
      </div>

      <Products />
    </Container>
  );
}
