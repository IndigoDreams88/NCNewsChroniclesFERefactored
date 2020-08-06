import React, { Component } from "react";
import "./App.css";
import { Router } from "@reach/router";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarLinks from "./Components/NavbarLinks.jsx";
import TrendingArticles from "./Components/TrendingArticles";
import LoginPage from "./Components/LoginPage";
import Topics from "./Components/Topics";
import IndividualArticle from "./Components/IndividualArticle";
import ErrorDisplay from "./Components/ErrorDisplay";

class App extends Component {
  state = {
    username: "",
    loggedIn: false,
  };

  setUsername = (username) => {
    this.setState({
      username: username,
      loggedIn: true,
    });
  };

  logOut = () => {
    this.setState({ username: "", loggedIn: false });
  };

  render() {
    const { username, loggedIn } = this.state;
    return (
      <div>
        <NavbarLinks
          setUsername={this.setUsername}
          username={username}
          loggedIn={loggedIn}
          logOut={this.logOut}
        />
        <Router primary={false}>
          <LoginPage path="/" />
          <Topics path="/topics" username={username} />
          <TrendingArticles path="/articles" username={username} />
          <TrendingArticles
            path="/topics/:topic/articles"
            username={username}
          />
          <IndividualArticle path="/articles/:article_id" username={username} />
          <ErrorDisplay default err={{ status: 404, msg: "Page not found" }} />
        </Router>
      </div>
    );
  }
}

export default App;
