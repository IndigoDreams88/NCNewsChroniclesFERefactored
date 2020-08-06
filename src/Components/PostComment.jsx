import React, { Component } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { postComment } from "./DataRequests";

class PostComment extends Component {
  state = {
    commentToAdd: "",
    err: null,
  };

  handleChange = (event) => {
    this.setState({ commentToAdd: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, article_id, addComment } = this.props;
    const { commentToAdd } = this.state;

    postComment(username, commentToAdd, article_id)
      .then((commentToAdd) => {
        addComment(commentToAdd.comment);
        this.setState({ commentToAdd: "" });
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

  render() {
    const { username } = this.props;
    const { err } = this.state;

    if (err !== null) {
      return (
        <div>
          <p>{err.status}</p>
          <p>{err.msg}</p>
        </div>
      );
    } else {
      return (
        <div>
          {username === "" || username === "guest" ? (
            <div style={{ margin: "10px" }}>
              "To post and delete comments, please check that you've logged in
              as jessjelly via the homepage."
            </div>
          ) : (
            <div>
              <Form>
                <Form.Row>
                  <Col>
                    <Form.Group controlId="commentInput">
                      <Form.Label>Have your say</Form.Label>
                      <Form.Control
                        type="text"
                        value={this.state.commentToAdd}
                        placeholder="Enter your comment here ..."
                        onChange={this.handleChange}
                      />
                    </Form.Group>
                    <Button
                      variant="info"
                      type="submit"
                      style={{ margin: "2px" }}
                      onClick={this.handleSubmit}
                    >
                      Submit
                    </Button>
                  </Col>
                </Form.Row>
              </Form>
            </div>
          )}
        </div>
      );
    }
  }
}

export default PostComment;
