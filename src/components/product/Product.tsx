import { Button, Card } from "react-bootstrap";

import styles from "./Product.module.css";
import type { Product } from "../../app/types";

type ProductProps = {
  product: Product;
};

export default function Product({ product }: ProductProps) {
  const { imgUrl, discount, frontTitle, oldPrice, newPrice, backText } =
    product;

  return (
    <Card className={`shadow p-2 ${styles.productCard}`}>
      <div className={styles.cardFront}>
        <div className={styles.discountBadge}>-{discount}%</div>
        <Card.Img variant="top" src={imgUrl} className={styles["card-img"]} />
        <Card.Body className={styles["card-body"]}>
          <Card.Title className={styles["card-title"]}>{frontTitle}</Card.Title>
          <Card.Text className={styles["card-text"]}>
            <span className={styles.oldPrice}>₾{oldPrice}</span>
            <br />
            <span className={styles.newPrice}>₾{newPrice}</span>
          </Card.Text>
        </Card.Body>
      </div>

      <div className={styles.cardBack}>
        <Card.Body className={styles["card-back-body"]}>
          <div>
            <Card.Title className={styles["card-back-title"]}>
              {frontTitle}
            </Card.Title>
            <br />
            <Card.Text>
              {backText.map((text, i) => (
                <span
                  key={i}
                  className={
                    i == 0
                      ? "d-inline-block text-center mb-2 fw-bold text-decoration-underline"
                      : "d-inline-block text-center fw-normal letter-spacing-1"
                  }
                >
                  {text}
                </span>
              ))}
            </Card.Text>
          </div>
        </Card.Body>

        <Button variant="info" className={styles.button}>
          კალათაში
        </Button>
      </div>
    </Card>
  );
}
