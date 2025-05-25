import { Container, Row, Col } from "react-bootstrap";
import Product from "../../components/product/Product";
import { useLoaderData } from "react-router";
import { productLoader } from "../../app/router";

export default function Products() {
  const { products } = useLoaderData<typeof productLoader>();

  return (
    <Container className="mt-4 mb-4">
      <Row className="d-flex justify-content-center gap-5">
        {products?.map((product) => (
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
