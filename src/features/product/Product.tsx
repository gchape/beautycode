import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import type { Product } from "../../app/types";

import styles from "./Product.module.css";

type ProductProps = {
  product: Product;
};

export default function Product({ product }: ProductProps) {
  const [flipped, setFlipped] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest(`.${styles.order}`)) return;
    
    setFlipped(!flipped);
  };

  const { imgUrl, discount, frontTitle, oldPrice, newPrice, backText } =
    product;

  return (
    <Card
      className={`shadow p-2 ${styles.productCard} ${
        flipped ? styles.flipped : ""
      }`}
      onClick={handleCardClick}
    >
      <div className={styles.cardFront}>
        <div className={styles.discountBadge}>-{discount}%</div>
        <Card.Img variant="top" src={imgUrl} className={styles["card-img"]} />
        <Card.Body className={styles["card-body"]}>
          <Card.Title className={styles["card-title"]}>{frontTitle}</Card.Title>
          <Card.Text className={styles["card-text"]}>
            <span className={styles.oldPrice}>₾{oldPrice}</span>
            <span className={styles.newPrice}>₾{newPrice}</span>
            <Button
              variant="info"
              className={styles.order}
              href="https://m.me/Beatlovegeorgia"
              onClick={(e) => e.stopPropagation()}
            >
              შეუკვეთე
            </Button>
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
                  className="d-inline-block text-left fw-normal letter-spacing-1 p-1"
                >
                  {text}
                </span>
              ))}
            </Card.Text>
          </div>
        </Card.Body>

        <Button
          variant="info"
          className={styles.button}
          href="https://m.me/Beatlovegeorgia"
          onClick={(e) => e.stopPropagation()}
        >
          შეუკვეთე
        </Button>
      </div>
    </Card>
  );
}
