import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Votes from "../Components/Votes.jsx";
import styles from "../CSS/Comments.module.css";
import PostComment from "../Components/PostComment.jsx";
import DeleteComment from "../Components/DeleteComment.jsx";

function Comments(props) {
  const {
    comments,
    username,
    article_id,
    addComment,
    deleteMessage,
    handleDelete,
  } = props;

  return (
    <Container>
      <Row>
        <Col>
          {deleteMessage !== "" ? (
            <div>
              <p>{deleteMessage}</p>
            </div>
          ) : null}
          <PostComment
            username={username}
            article_id={article_id}
            addComment={addComment}
          />
          {comments.map((comment) => {
            const { author, body, comment_id, created_at, votes } = comment;
            return (
              <Card
                key={comment_id}
                style={{ width: "100%", margin: "5px" }}
                bg="Secondary"
                text="dark"
                border="Light"
              >
                <Card.Body>
                  <Card.Header>
                    <small className="text-muted">
                      Posted by {author} on {created_at}
                    </small>
                  </Card.Header>
                  <Card.Text>{body}</Card.Text>
                </Card.Body>
                <div className={styles.votesArea}>
                  <Votes votes={votes} comment_id={comment_id} />
                  <DeleteComment
                    username={username}
                    comment={comment}
                    handleDelete={handleDelete}
                  />
                </div>
              </Card>
            );
          })}
        </Col>
      </Row>
    </Container>
  );
}

export default Comments;
