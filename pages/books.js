import React, { Component } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
  Form,
  Input,
  InputGroup
} from "reactstrap";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import TextTruncate from "react-text-truncate";

import route from "../components/api-services";
import Layout from "../components/Layout";

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allBooks: [],
      minPage: 0,
      maxPage: 4,
      searchValue: ""
    };
  }

  componentDidMount = () => {
    axios.get("http://localhost:4000/books/").then(res => {
      this.setState({
        allBooks: res.data
      });
    });
  };

  getMore = () => {
    this.setState(
      {
        maxPage: this.state.maxPage + 4
      },
      () => {
        this.componentDidMount();
      }
    );
  };

  getLess = () => {
    if (this.state.maxPage > 4) {
      this.setState(
        {
          maxPage: this.state.maxPage - 4
        },
        () => {
          this.componentDidMount();
        }
      );
    }
  };

  searchField = () => {
    axios
      .get(route.baseURL + route.booksLimitTo + "&q=" + this.state.searchValue)
      .then(res => {
        this.setState({
          allBooks: res.data
        });
      });
  };

  resetSearchField = () => {
    this.setState(
      {
        searchValue: ""
      },
      () => {
        document.getElementById("searchForm").reset();
        this.searchField();
      }
    );
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { allBooks, maxPage } = this.state;
    return (
      <Layout>
        <Container className="custom-container">
          <Row>
            <Col md="12" className="center-position">
              <h2>Find your favorite book</h2>
              <br />
              <Form id="searchForm">
                <Row>
                  <Col md="7">
                    <InputGroup>
                      <Input
                        placeholder="... type to search"
                        name="searchValue"
                        onChange={event => {
                          this.handleChange(event);
                          this.searchField();
                        }}
                      />
                    </InputGroup>
                  </Col>
                  <Button
                    color="primary"
                    size="sm"
                    onClick={() => this.searchField()}
                  >
                    Find your book
                  </Button>
                  <Button size="sm" onClick={() => this.resetSearchField()}>
                    Reset
                  </Button>
                </Row>
              </Form>
            </Col>
          </Row>
          <hr />
          <Row>
            {allBooks.map(item => (
              <Col md="6" key={item.id}>
                <Card>
                  <CardImg
                    top
                    width="300px"
                    height="300px"
                    src={item.images}
                    alt="Card image"
                  />
                  <CardBody>
                    <CardTitle>
                      <b>Title:</b> {item.title}
                    </CardTitle>
                    <div>
                      <b>Description:</b>
                      <TextTruncate
                        line={5}
                        truncateText="…"
                        text={item.description}
                      />
                    </div>
                    <CardText>
                      <b>Author:</b> {item.author}
                    </CardText>
                    <CardText>
                      <b>Publisher:</b> {item.publisher}
                    </CardText>
                    <CardText>
                      <b>Published: </b>
                      <Moment format="DD/MM/YYYY">{item.published}</Moment>
                    </CardText>
                    <CardText>
                      <b>Pages:</b> {item.pages}
                    </CardText>
                    <CardText>
                      <b>Website: </b>
                      <a
                        href={item.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.website}
                      </a>
                    </CardText>
                  </CardBody>
                </Card>
                <br />
              </Col>
            ))}
          </Row>
          <hr />
          <Row>
            <Col md="12" className="center-position">
              <Button
                color="success"
                onClick={() => {
                  this.getMore();
                }}
              >
                Show more{" "}
              </Button>
              {maxPage > 4 && (
                <Button
                  color="danger"
                  onClick={() => {
                    this.getLess();
                  }}
                >
                  Show less{" "}
                </Button>
              )}
            </Col>
          </Row>
          <br />
        </Container>
      </Layout>
    );
  }
}

export default Books;
