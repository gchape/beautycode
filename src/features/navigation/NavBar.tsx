import { Container, Nav, Navbar } from "react-bootstrap";
import styles from "./NavBar.module.css";
import { Link } from "react-router";

export default function NavBar() {
  return (
    <Navbar expand="lg" className={styles.navbar} sticky="top">
      <Container className="px-4">
        <Navbar.Brand
          className={`d-flex align-items-center ${styles.brandTitle}`}
        >
          <Link to="/" className={styles.logo} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`ms-auto ${styles.links}`}>
            <Nav.Link as={Link} to={"/"}>
              მთავარი
            </Nav.Link>
            <Nav.Link as={Link} to={"/products"}>
              პროდუქტები
            </Nav.Link>
            {/* <NavDropdown title="კატეგორიები" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to={""}>
                ეპილატორები
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to={""}>
                ფენები
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to={""}>
                აქსესუარები
              </NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
