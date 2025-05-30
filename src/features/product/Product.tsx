import { Button, Card } from "react-bootstrap";
import type { Product } from "../../app/types";

import styles from "./Product.module.css";

type ProductProps = {
  product: Product;
};

export default function Product({ product }: ProductProps) {
  const { imgUrl, discount, frontTitle, oldPrice, newPrice } = product;

  return (
    <Card className={`shadow p-2 ${styles["card"]}`}>
      <div className={styles["card-inline"]}>
        <div className={styles["discount-badge"]}>-{discount}%</div>
        <Card.Img variant="top" src={imgUrl} className={styles["card-img"]} />
        <Card.Body className={styles["card-body"]}>
          <Card.Title className={styles["card-title"]}>{frontTitle}</Card.Title>
          <Card.Text className={styles["card-text"]}>
            <span className={styles["old-price"]}>₾{oldPrice}</span>
            <span className={styles["new-price"]}>₾{newPrice}</span>
            <Button
              variant="info"
              className={styles["btn-order"]}
              href="https://m.me/Beatlovegeorgia"
              onClick={(e) => e.stopPropagation()}
            >
              შეუკვეთე
            </Button>
          </Card.Text>
        </Card.Body>
      </div>
    </Card>
  );
}
