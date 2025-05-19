import { Button, Card, Container, Row, Col } from "react-bootstrap";
import styles from "./Products.module.css";

export default function Products() {
  return (
    <Container className="mt-5">
      <Row className="g-4 d-flex justify-content-between">
        <Col xs={12} sm={6} md={4} lg={3}>
          <Card className={`shadow ${styles.productCard}`}>
            <Card.Img variant="top" src="" alt="asdasdasd" />
            <Card.Body>
              <Card.Title>ბარათი</Card.Title>
              <Card.Text>Lorem ipsum dolor sit.</Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={4} lg={3}>
          <Card className={`shadow ${styles.productCard}`}>
            <Card.Body>
              <Card.Title>ბარათი</Card.Title>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={6} md={4} lg={3}>
          <Card className={`shadow ${styles.productCard}`}>
            <Card.Body>
              <Card.Title>ბარათი</Card.Title>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
