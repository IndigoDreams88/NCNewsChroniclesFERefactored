import React from "react";
import { Button, Image } from "react-bootstrap";
import { Link } from "@reach/router";

function BrokenLinks(props) {
  return (
    <div>
      <Image
        src="/surprisedCat.jpg"
        roundedCircle
        style={{ height: "200px", width: "200px" }}
      />
      <h2>Whoops something went wrong!</h2>
      <Button variant="info" as={Link} to="/">
        Go back to homepage
      </Button>
    </div>
  );
}

export default BrokenLinks;
