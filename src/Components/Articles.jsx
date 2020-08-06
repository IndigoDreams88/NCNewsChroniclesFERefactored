import React, { Component } from "react";
import { getArticles } from "../Components/DataRequests.jsx";
import ArticleCards from "../Components/ArticleCards.jsx";
import { Link } from "@reach/router";
import {
  Container,
  Navbar,
  Button,
  ButtonGroup,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";

class Articles extends Component {
  state = {
    articles: [],
    sort_by: "",
    order: "",
    isLoading: true,
    err: null,
  };

  handleDataRequest = () => {
    const { sort_by, order } = this.state;
    const { topic } = this.props;
    getArticles({
      topic: topic,
      sort_by: sort_by,
      order: order,
    })
      .then((articles) => {
        this.setState({
          articles: articles,
          isLoading: false,
        });
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
  };

  handleSortValue = (sort_by) => {
    this.setState({
      sort_by,
    });
  };

  handleOrderValue = (order) => {
    this.setState({
      order,
    });
  };

  componentDidMount() {
    this.handleDataRequest();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.topic !== prevProps.topic ||
      this.state.sort_by !== prevState.sort_by ||
      this.state.order !== prevState.order
    ) {
      this.handleDataRequest();
    }
  }

  render() {
    const { articles, sort_by, order, err } = this.state;
    const { topic } = this.props;

    return (
      <Container>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-center"
          >
            <Button
              variant="outline-info"
              as={Link}
              to="/articles"
              style={{ marginRight: "20px" }}
            >
              All articles
            </Button>

            <Button
              variant="outline-info"
              style={{ marginRight: "20px" }}
              onClick={() => this.handleSortValue("created_at")}
            >
              Latest
            </Button>

            <Button
              variant="outline-info"
              style={{ marginRight: "20px" }}
              onClick={() => this.handleSortValue("votes")}
            >
              Popular
            </Button>

            <Button
              variant="outline-info"
              style={{ marginRight: "20px" }}
              onClick={() => this.handleSortValue("comment_count")}
            >
              Trending
            </Button>

            <DropdownButton
              as={ButtonGroup}
              title="Order"
              id="bg-nested-dropdown"
              variant="outline-info"
              style={{ marginRight: "20px" }}
            >
              <Dropdown.Item
                eventKey="1"
                onClick={() => this.handleOrderValue("asc")}
              >
                Ascending
              </Dropdown.Item>

              <Dropdown.Item
                eventKey="2"
                onClick={() => this.handleOrderValue("desc")}
              >
                Descending
              </Dropdown.Item>
            </DropdownButton>
          </Navbar.Collapse>
        </Navbar>
        <ArticleCards
          articles={articles}
          topic={topic}
          sort_by={sort_by}
          order={order}
          err={err}
        />
      </Container>
    );
  }
}

export default Articles;
