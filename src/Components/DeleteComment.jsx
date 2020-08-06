import React from "react";
import { Button } from "react-bootstrap";

function DeleteComment(props) {
  const { username, comment, handleDelete } = props;

  return (
    <div>
      {username === comment.author && (
        <Button variant="info" onClick={() => handleDelete(comment.comment_id)}>
          Delete comment
        </Button>
      )}
    </div>
  );
}

export default DeleteComment;
