import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import styles from "./NavBar.module.css";

export default function NavBar() {
  return (
    <Navbar expand="lg" className={styles.navbar} sticky="top">
      <Container className="px-4">
        <Navbar.Brand
          className={`d-flex align-items-center ${styles.brandTitle}`}
        ></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`ms-auto ${styles.links}`}>
            <Nav.Link href="/">მთავარი</Nav.Link>
            <Nav.Link href="#products">პროდუქტები</Nav.Link>
            <NavDropdown title="კატეგორიები" id="basic-nav-dropdown">
              <NavDropdown.Item href="#epilators">ეპილატორები</NavDropdown.Item>
              <NavDropdown.Item href="#hairdryers">ფენები</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#accessories">
                აქსესუარები
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
