import React, { Component } from "react";
import MainImages from "../Components/MainImages.jsx";
import { Container, Row, Col, Table, Spinner, Image } from "react-bootstrap";
import { getArticles, getAllUsers } from "../Components/DataRequests.jsx";
import Articles from "../Components/Articles.jsx";

class TrendingArticles extends Component {
  state = {
    trendingArticles: [],
    users: [],
    isLoading: true,
    err: null,
  };

  componentDidMount() {
    const trendingArticles = getArticles({
      topic: "",
      sort_by: "comment_count",
      order: "desc",
    });

    const users = getAllUsers();

    return Promise.all([trendingArticles, users])
      .then(([trendingArticles, users]) => {
        this.setState({
          trendingArticles,
          users,
          isLoading: false,
        });
      })
      .catch((response) => {
        const { status, msg } = response;
        this.setState({
          err: {
            status: status,
            msg: msg,
          },
          isLoading: false,
          clicked: false,
        });
      });
  }

  render() {
    const { trendingArticles, users, isLoading, err } = this.state;
    const { topic } = this.props;
    return (
      <Container className="row no-gutters">
        <MainImages />
        {err !== null ? (
          <div>
            <center>
              <h2>status</h2>
              <br></br>
              <h3>msg</h3>
            </center>
          </div>
        ) : null}
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
          <Container className="row no-gutters">
            <Row className="row no-gutters">
              <Col
                className="no-gutters d-flex flex-wrap justify-content-center"
                xs={12}
                md={8}
                lg={8}
              >
                <Articles topic={topic} />
              </Col>

              <Col
                className="no-gutters d-flex flex-wrap justify-content-center"
                xs={12}
                md={4}
                lg={4}
              >
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th></th>
                      <th></th>
                      <th>Top posters</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, currentIndex) => {
                      return (
                        <tr key={user.username}>
                          <td>{currentIndex + 1}</td>
                          <td>
                            <Image
                              src={user.avatar_url}
                              style={{ height: "60px", width: "60px" }}
                              thumbnail
                            />
                          </td>
                          <td>
                            {user.name} a.k.a {user.username}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>

                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Trending</th>
                    </tr>
                  </thead>
                  <tbody>
                    {trendingArticles.map((article, currentIndex) => {
                      return (
                        <tr key={article.title}>
                          <td>{currentIndex + 1}</td>
                          <td>{article.title}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        )}
      </Container>
    );
  }
}

export default TrendingArticles;
