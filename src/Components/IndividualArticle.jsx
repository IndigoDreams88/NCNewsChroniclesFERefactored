import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Jumbotron,
  Spinner,
  Button,
} from "react-bootstrap";
import { Link } from "@reach/router";
import styles from "../CSS/IndividualArticle.module.css";
import Votes from "../Components/Votes.jsx";
import Comments from "../Components/Comments.jsx";
import {
  getIndividualArticle,
  getComments,
  deleteComment,
} from "./DataRequests";

class IndividualArticle extends Component {
  state = {
    article: {},
    comments: [],
    isLoading: true,
    err: null,
    deleteMessage: "",
  };

  componentDidMount() {
    const { article_id } = this.props;
    const article = getIndividualArticle(article_id);
    const comments = getComments(article_id);

    return Promise.all([article, comments])
      .then(([article, comments]) => {
        this.setState({
          article,
          comments,
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

  addComment = (newlyAddedComment) => {
    this.setState((prevState) => {
      return { comments: [newlyAddedComment, ...prevState.comments] };
    });
  };

  handleDelete = (comment_id) => {
    const { comments } = this.state;
    deleteComment(comment_id)
      .then(() => {
        const filteredComments = comments.filter((comment) => {
          if (comment.comment_id !== comment_id) {
            return true;
          } else {
            return false;
          }
        });
        this.setState({
          comments: filteredComments,
          deleteMessage: "Your comment has been deleted",
        });
      })
      .catch((response) => {
        const { status, msg } = response;
        this.setState({
          err: {
            status: status,
            msg: msg,
          },
        });
      });
  };

  handleClick = () => {
    this.setState((prevState) => ({
      clicked: !prevState.clicked,
    }));
  };

  render() {
    const {
      article,
      isLoading,
      comments,
      clicked,
      deleteMessage,
      err,
    } = this.state;
    const { article_id, username } = this.props;
    const { votes } = article;

    if (err !== null) {
      return (
        <div>
          <h2>{err.status}</h2>
          <h3>{err.msg}</h3>
        </div>
      );
    } else {
      return (
        <Container>
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
                    style={{ margin: "40px" }}
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
            <Container style={{ marginTop: "40px" }}>
              <Row className="no-gutters">
                <Col
                  className="no-gutters d-flex flex-wrap justify-content-center"
                  xs={12}
                  md={1}
                  lg={1}
                ></Col>
                <Col
                  className="no-gutters d-flex flex-wrap justify-content-center"
                  xs={12}
                  md={10}
                  lg={10}
                >
                  <Jumbotron
                    fluid
                    style={{
                      padding: "10px",
                      backgroundColor: "#343a40",
                      border: "1px solid #ffffff",
                      color: "#ffffff",
                    }}
                  >
                    <div className={styles.xButtonContainer}>
                      <Link to="/articles">
                        <Button variant="info">X</Button>
                      </Link>
                    </div>
                    <center>
                      <h3
                        style={{ fontFamily: "Orbitron" }}
                        className={styles.mainTitle}
                      >
                        {article.title}
                      </h3>
                      <h5
                        style={{ fontFamily: "Orbitron" }}
                        className={styles.subTitle}
                      >
                        Written by {article.author}
                      </h5>
                      <p style={{ margin: "20px" }}>{article.body}</p>

                      <div className={styles.buttonContainer}>
                        <Button
                          size="sm"
                          variant="info"
                          style={{ marginRight: "10px" }}
                          onClick={this.handleClick}
                        >
                          <img
                            src="/commentsIcon.png"
                            alt="comments"
                            style={{
                              height: "30px",
                              width: "30px",
                              marginRight: "5px",
                            }}
                          />
                          {article.comment_count} comments
                        </Button>

                        <Votes votes={votes} article_id={article_id} />
                      </div>

                      {clicked ? (
                        <div>
                          <Comments
                            comments={comments}
                            username={username}
                            article_id={article_id}
                            addComment={this.addComment}
                            handleDelete={this.handleDelete}
                            deleteMessage={deleteMessage}
                          />
                        </div>
                      ) : null}
                    </center>
                  </Jumbotron>
                </Col>
                <Col
                  className="no-gutters d-flex flex-wrap justify-content-center"
                  xs={12}
                  md={1}
                  lg={1}
                ></Col>
              </Row>
            </Container>
          )}
        </Container>
      );
    }
  }
}

export default IndividualArticle;
