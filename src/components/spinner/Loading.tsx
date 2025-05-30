import { Container, Spinner } from "react-bootstrap";

export default function Loading() {
  return (
    <Container
      fluid
      className="d-flex flex-column justify-content-center align-items-center gap-2 bg-light h-100"
    >
      <Spinner animation="border" variant="primary" className="h4"/>
    </Container>
  );
}
