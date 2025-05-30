import { Container, Row, Col } from "react-bootstrap";
import { useQuery } from "@tanstack/react-query";
import type { Product as TProduct } from "../../app/types";
import Product from "../product/Product";
import Loading from "../../components/spinner/Loading";
import { useParams } from "react-router";
import { useProducts } from "../../hooks/useProducts";

export default function Products() {
  const { category } = useParams();
  const { products, isPending } = useProducts(category);

  if (isPending) {
    return <Loading />;
  }

  return (
    <Container className="mt-4 mb-4 p-1">
      <Row className="d-flex justify-content-center gap-5">
        {products!.map((product) => (
          <Col
            className="d-flex justify-content-center"
            key={product.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
          >
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
