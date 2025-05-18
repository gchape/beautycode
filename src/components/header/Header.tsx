import { Container, Row, Col } from "react-bootstrap";
import {
  faFacebookF,
  faInstagram,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Container className="px-4">
        <Row className="align-items-center text-center text-md-start">
          <Col xs={12} md={4} className="mb-2 mb-md-0">
            <div className={styles.socials}>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={styles.facebook}
              >
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={styles.instagram}
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className={styles.tiktok}
              >
                <FontAwesomeIcon icon={faTiktok} />
              </a>
            </div>
          </Col>

          <Col xs={12} md={4} className="mb-2 mb-md-0">
            <p className={`mb-0 ${styles.description}`}>
              სრულყოფილი თავის მოვლის საშუალებები
            </p>
          </Col>

          <Col xs={12} md={4}>
            <div
              className={`${styles.contacts} justify-content-center justify-content-md-end`}
            >
              <a
                href="mailto:info@morebeauty.ge"
                className={styles.contactItem}
                aria-label="Email info@morebeauty.ge"
              >
                <FontAwesomeIcon
                  className={styles.emailIcon}
                  icon={faEnvelope}
                />{" "}
                info@morebeauty.ge
              </a>
              <a
                href="tel:+995571113422"
                className={styles.contactItem}
                aria-label="Call +995 571 11 34 22"
              >
                <FontAwesomeIcon className={styles.phoneIcon} icon={faPhone} />{" "}
                (+995) 571 11 34 22
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
}
