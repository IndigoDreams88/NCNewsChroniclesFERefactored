import React, { Component } from "react";
import { Button } from "react-bootstrap";
import styles from "../CSS/Votes.module.css";
import { patchVotes } from "../Components/DataRequests.jsx";

class Votes extends Component {
  state = {
    voteChange: 0,
    err: null,
  };

  changeVotes = (change) => {
    this.setState((currentState) => {
      return { voteChange: currentState.voteChange + change };
    });
  };

  handleVoteChange = (change) => {
    const { article_id, comment_id } = this.props;
    if (article_id !== undefined) {
      patchVotes(article_id, "articles", change)
        .then(() => {
          this.changeVotes(change);
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
    } else if (comment_id !== undefined) {
      patchVotes(comment_id, "comments", change)
        .then(() => {
          this.changeVotes(change);
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
  };

  render() {
    const { votes } = this.props;
    return (
      <div className={styles.voteButtons}>
        <Button
          size="sm"
          variant="info"
          style={{ marginRight: "10px" }}
          onClick={() => this.handleVoteChange(1)}
          disabled={this.state.voteChange === 1}
        >
          <img
            src="/upArrow.png"
            alt="up arrow"
            style={{
              height: "15px",
              width: "15px",
            }}
          />
        </Button>

        <Button
          size="sm"
          variant="info"
          style={{ marginRight: "10px" }}
          onClick={() => this.handleVoteChange(-1)}
          disabled={this.state.voteChange === -1}
        >
          <img
            src="/downArrow.png"
            alt="down arrow"
            style={{
              height: "15px",
              width: "15px",
            }}
          />
        </Button>
        <center>
          <p
            style={{
              marginTop: "10px",
              marginBottom: "0px",
              marginRight: "20px",
              fontFamily: "Orbitron",
              fontSize: "medium",
            }}
          >
            votes: {votes + this.state.voteChange}
          </p>
        </center>
      </div>
    );
  }
}

export default Votes;
