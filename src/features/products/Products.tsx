import { Container, Row, Col } from "react-bootstrap";
import Product from "../../components/product/Product";

export default function Products() {
  return (
    <Container className="mt-5">
      <Row className="g-4 d-flex justify-content-around">
        <Col xs={12} sm={6} md={4} lg={3} className="w-auto">
          <Product
            imgUrl="https://morebeauty.ge/wp-content/uploads/2024/09/IMG_1637.jpeg"
            discount={44}
            frontTitle="TouchBeauty-ის ავტომატური IPL ეპილაციის აპარატი მოყინვის რეჟიმითა და
            საფირის ეკრანით"
            oldPrice={100.0}
            newPrice={80.0}
            backText={[
              "მსოფლიოში უკონკურენტო და ყველაზე ძლიერი ეპილაციის აპარატი.",
              "განსაკუთრებული, რადგან აქვს 5 წლიანი გარანტია ნაწილებზე და სერვისზე, რაც მსოფლიოში არც ერთ სხვა IPL აპარატს არ აქვს!",
            ]}
          />
        </Col>
      </Row>
    </Container>
  );
}
