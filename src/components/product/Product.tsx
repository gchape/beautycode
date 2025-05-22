import { Button, Card } from "react-bootstrap";

import styles from "./Product.module.css";

type ProductProps = {
  imgUrl: string;
  discount: number;
  frontTitle: string;
  oldPrice: number;
  newPrice: number;
  backText: string[];
};

export default function Product({
  imgUrl,
  discount,
  frontTitle,
  oldPrice,
  newPrice,
  backText,
}: ProductProps) {
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
            <Card.Text className={styles["card-back-text"]}>
              {backText.map((text, i) => (
                <p
                  key={i}
                  style={{
                    fontWeight: i === 0 ? "600" : "400",
                    margin: i === 0 ? "0 0 8px 0" : "0",
                    letterSpacing: i === 0 ? "1.2px" : "normal",
                    textDecoration: i === 0 ? "underline" : "none",
                    cursor: "default",
                  }}
                >
                  {text}
                </p>
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
