import React from "react";

function ErrorDisplay(props) {
  const { err } = props;
  return (
    <div>
      <center>
        <h2>{err.status}</h2>
        <h3>{err.msg}</h3>
      </center>
    </div>
  );
}

export default ErrorDisplay;
