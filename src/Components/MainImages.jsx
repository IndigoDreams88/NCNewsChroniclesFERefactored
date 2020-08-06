import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import styles from "../CSS/MainImagesStyling.module.css";

function MainImages(props) {
  return (
    <Container>
      <Row className="mx-auto" style={{ margin: "40px" }}>
        <Col xs={12} md={3}>
          <Image src="/blackCat.jpg" rounded className={styles.catImage} />
        </Col>

        <Col xs={12} md={3}>
          <Image src="/grumpyCat.jpg" rounded className={styles.catImage} />
        </Col>

        <Col xs={12} md={3}>
          <Image src="/persianCat.jpg" rounded className={styles.catImage} />
        </Col>

        <Col xs={12} md={3}>
          <Image src="/gingerCat.jpg" rounded className={styles.catImage} />
        </Col>
      </Row>
    </Container>
  );
}

export default MainImages;
