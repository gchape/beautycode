import {Container, Row, Col} from "react-bootstrap";
import {
    faFacebookF,
    faInstagram,
    faTiktok,
    faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <Container className="px-4">
                <Row className="align-items-center text-center text-md-start">
                    <Col xs={12} md={4} className="mb-2 mb-md-0">
                        <div className={styles.socials}>
                            <a
                                href="https://www.facebook.com/Beatlovegeorgia"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className={styles.facebook}
                            >
                                <FontAwesomeIcon icon={faFacebookF}/>
                            </a>
                            <a
                                href="https://www.instagram.com/beauty_recipe___/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className={styles.instagram}
                            >
                                <FontAwesomeIcon icon={faInstagram}/>
                            </a>
                            <a
                                href="https://www.tiktok.com/@beauty.recipe13"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="TikTok"
                                className={styles.tiktok}
                            >
                                <FontAwesomeIcon icon={faTiktok}/>
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
                                href="mailto:13beauty.code@gmail.com"
                                className={styles.contactItem}
                                aria-label="Email 13beauty.code@gmail.com"
                            >
                                <FontAwesomeIcon
                                    className={styles.emailIcon}
                                    icon={faEnvelope}
                                />{" "}
                                13beauty.code@gmail.com
                            </a>
                            <a
                                href="https://wa.me/995574074833"
                                className={styles.contactItem}
                                aria-label="Message on WhatsApp: +995 574-074-833"
                            >
                                <FontAwesomeIcon
                                    className={styles.whatsappIcon}
                                    icon={faWhatsapp}
                                />{" "}
                                (+995) 574-074-833
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </header>
    );
}
