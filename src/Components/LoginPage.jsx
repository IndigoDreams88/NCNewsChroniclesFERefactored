import React, { Component } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

class LoginPage extends Component {
  render() {
    return (
      <Container>
        <Row className="mx-auto" style={{ margin: "40px" }}>
          <Col xs={12} md={2}></Col>
          <Col xs={12} md={4}>
            <Image
              src="/catGlasses.jpg"
              roundedCircle
              style={{ height: "auto", maxWidth: "100%" }}
            />
          </Col>
          <Col xs={12} md={4}>
            <h4 style={{ color: "#ffffff" }}>Welcome to NC News Chronicles!</h4>
            <br></br>
            <h5>Please log in above to get started.</h5>
            <br></br>
            <h5>Guest</h5>
            <p style={{ color: "#ffffff" }}>
              As a guest you'll be able to view articles and comments and vote
              on them.
            </p>

            <h5>jessjelly</h5>
            <p style={{ color: "#ffffff" }}>
              As jessjelly you'll be able to post and delete your own article
              comments, as well as vote on articles and their comments.
            </p>
          </Col>
          <Col xs={12} md={2}></Col>
        </Row>
      </Container>
    );
  }
}

export default LoginPage;
