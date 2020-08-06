import React from "react";
import styles from "../CSS/NavbarLinks.module.css";
import { Navbar, Nav, Form, Button, Badge } from "react-bootstrap";
import { Link } from "@reach/router";

function NavbarLinks(props) {
  const handleUsername = (username) => {
    props.setUsername(username);
  };

  const { username, loggedIn, logOut } = props;

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="/">
        <h2 style={{ fontFamily: "Orbitron" }} className={styles.title}>
          NC News Chronicles
        </h2>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"></Nav>
        <Form inline>
          {username === "guest" || username === "jessjelly" ? null : (
            <Button
              variant="info"
              as={Link}
              to="/topics"
              style={{ marginRight: "20px" }}
              onClick={() => handleUsername("guest")}
            >
              Login as Guest
            </Button>
          )}
          {username === "jessjelly" || username === "guest" ? null : (
            <Button
              variant="info"
              as={Link}
              to="/topics"
              style={{ marginRight: "20px" }}
              onClick={() => handleUsername("jessjelly")}
            >
              Login as Jessjelly
            </Button>
          )}

          {username !== "" ? (
            <h3>
              <Badge variant="secondary" style={{ marginRight: "20px" }}>
                Logged in as: {username}
              </Badge>
            </h3>
          ) : null}

          {username !== "" && loggedIn ? (
            <Button
              variant="info"
              as={Link}
              to="/topics"
              style={{ marginRight: "20px" }}
            >
              Back to topics
            </Button>
          ) : null}

          {username !== "" && loggedIn ? (
            <Button variant="info" onClick={logOut} as={Link} to="/">
              Logout
            </Button>
          ) : null}
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarLinks;
