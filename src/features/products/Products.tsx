import { Container, Row, Col } from "react-bootstrap";
import Product from "../../components/product/Product";
import { useLoaderData, useParams, type Params } from "react-router";
import { productLoader } from "../../app/router";

export default function Products() {
  const { products } = useLoaderData<typeof productLoader>();

  return (
    <Container className="mt-4 mb-4">
      <Row className="d-flex justify-content-center gap-5">
        {products?.map((product) => (
          <Col
            key={product.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            style={{ width: "fit-content" }}
          >
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
