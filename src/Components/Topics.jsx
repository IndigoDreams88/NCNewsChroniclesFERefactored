import React, { Component } from "react";
import { Link } from "@reach/router";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import styles from "../CSS/TopicsStyling.module.css";
import { getTopics } from "../Components/DataRequests.jsx";

class Topics extends Component {
  state = {
    topics: [],
    isLoading: true,
    err: null,
  };

  componentDidMount() {
    getTopics()
      .then((topics) => {
        this.setState({ topics, isLoading: false });
      })
      .catch(({ response }) => {
        const { status, msg } = response;
        this.setState({
          err: {
            status: status,
            msg: msg,
          },
          isLoading: false,
        });
      });
  }

  render() {
    const { topics, isLoading, err } = this.state;

    if (err !== null) {
      return (
        <div>
          <h2>{err.status}</h2>
          <h3>{err.msg}</h3>
        </div>
      );
    } else {
      return (
        <div>
          {isLoading ? (
            <Container>
              <Row>
                <Col
                  className="no-gutters d-flex flex-wrap justify-content-center"
                  xs={2}
                  md={2}
                  lg={2}
                ></Col>
                <Col
                  className="no-gutters d-flex flex-wrap justify-content-center"
                  xs={10}
                  md={10}
                  lg={10}
                >
                  <Spinner
                    animation="border"
                    variant="info"
                    role="status"
                    size="80px"
                  >
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                </Col>
                <Col
                  className="no-gutters d-flex flex-wrap justify-content-center"
                  xs={12}
                  md={2}
                  lg={2}
                ></Col>
              </Row>
            </Container>
          ) : (
            <Container>
              <Row>
                <Col
                  className="no-gutters d-flex flex-wrap justify-content-center"
                  xs={12}
                  md={12}
                  lg={12}
                >
                  <center>
                    <h2 style={{ color: "white" }}>
                      Welcome {this.props.username}!
                    </h2>
                    <h4 style={{ color: "white" }}>
                      What would you like to do?
                    </h4>
                  </center>
                  <div className={styles.topicCards}>
                    <Card style={{ width: "12rem", margin: "20px" }}>
                      <Card.Body>
                        <center>
                          <Card.Title>
                            All the latest news at your fingertips!
                          </Card.Title>

                          <Button variant="info" as={Link} to="/articles">
                            Go to all articles
                          </Button>
                        </center>
                      </Card.Body>
                    </Card>
                    {topics.map((topic, currentIndex) => {
                      return (
                        <div key={topic.slug}>
                          <Card style={{ width: "12rem", margin: "20px" }}>
                            <Card.Body>
                              <center>
                                <Card.Title>{topic.description}</Card.Title>
                                <Button
                                  variant="info"
                                  as={Link}
                                  to={`/topics/${topic.slug}/articles`}
                                >
                                  Go to {topic.slug} articles
                                </Button>
                              </center>
                            </Card.Body>
                          </Card>
                        </div>
                      );
                    })}
                  </div>
                </Col>
              </Row>
            </Container>
          )}
        </div>
      );
    }
  }
}

export default Topics;
