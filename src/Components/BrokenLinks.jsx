import React from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "@reach/router";

function BrokenLinks(props) {
  return (
    <div>
      <Image
        src="/surprisedCat.jpg"
        roundedCircle
        style={{ height: "200px", width: "200px", marginTop: "60px" }}
      />
      <h2 style={{ margin: "5px" }}>Whoops something went wrong!</h2>
      <Button variant="info" as={Link} to="/" style={{ margin: "5px" }}>
        Go back to homepage
      </Button>
    </div>
  );
}

export default BrokenLinks;
