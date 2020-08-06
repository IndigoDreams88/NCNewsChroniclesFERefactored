import React, { Component } from "react";
import { Link } from "@reach/router";
import { Card, Button, Container, Badge } from "react-bootstrap";
import styles from "../CSS/ArticleCards.module.css";

class ArticleCards extends Component {
  render() {
    const { articles, err } = this.props;

    return (
      <Container
        className="row no-gutters"
        style={{ padding: "0px", textDecoration: "none" }}
      >
        {err !== null ? (
          <div>
            <center>
              <h2>status</h2>
              <br></br>
              <h3>msg</h3>
            </center>
          </div>
        ) : null}
        {articles.map((article, currentIndex) => {
          return (
            <Link
              to={`/articles/${article.article_id}`}
              key={article.article_id}
            >
              <Container className="row no-gutters" style={{ padding: "0px" }}>
                <Card
                  style={{
                    padding: "0px",
                  }}
                  bg="dark"
                  text="light"
                  border="info"
                >
                  <Card.Header
                    style={{ fontFamily: "Orbitron", color: "#ffffff" }}
                  >
                    <h3>
                      <Badge variant="secondary">{article.topic}</Badge>
                    </h3>
                    {article.title} - Written by: {article.author}
                  </Card.Header>
                  <Card.Body>
                    <Card.Text>{article.body.slice(0, 100)}...</Card.Text>
                    <div className={styles.card}>
                      <Button size="sm" variant="dark">
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
                    </div>
                  </Card.Body>
                </Card>
              </Container>
            </Link>
          );
        })}
      </Container>
    );
  }
}

export default ArticleCards;
