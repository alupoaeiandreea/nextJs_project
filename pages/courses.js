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

class Courses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCourses: [],
      minPage: 0,
      maxPage: 4,
      searchValue: ""
    };
  }

  componentDidMount = () => {
    if (window.location.pathname === "/courses") {
      axios
        .get(
          route.baseURL +
            route.coursesLimitTo +
            "&_start=" +
            this.state.minPage +
            "&_end=" +
            this.state.maxPage
        )
        .then(res => {
          this.setState({
            allCourses: res.data
          });
        });
    }

    if (window.location.pathname === "/courses/:bookId") {
      axios
        .get(
          route.baseURL +
            route.coursesByBooksID +
            this.props.match.params.bookId +
            "&_start=" +
            this.state.minPage +
            "&_end=" +
            this.state.maxPage
        )
        .then(res => {
          this.setState({
            allCourses: res.data
          });
        });
    }
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
      .get(
        route.baseURL + route.coursesLimitTo + "&q=" + this.state.searchValue
      )
      .then(res => {
        this.setState({
          allCourses: res.data
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
    const { allCourses, maxPage } = this.state;
    return (
      <Layout>
        <Container className="custom-container">
          <Row>
            <Col md="12" className="center-position">
              <h2>Enjoy all available courses</h2>
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
                    Find your courses
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
            {allCourses.map(item => (
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
                      <b>Title:</b> {item.small_description}
                    </CardTitle>
                    <b>Description:</b>
                    <TextTruncate
                      line={5}
                      truncateText="…"
                      text={item.long_description}
                    />
                    <CardText>
                      <b>Tags:</b> {item.tags}
                    </CardText>
                    <CardText>
                      <b>Points:</b> {item.points}
                    </CardText>
                  </CardBody>
                </Card>
                <br />
              </Col>
            ))}
            <Col md="12" className="center-position">
              <Button
                color="success"
                onClick={() => {
                  this.getMore();
                }}
              >
                Show more
              </Button>
              {maxPage > 4 && (
                <Button
                  color="danger"
                  onClick={() => {
                    this.getLess();
                  }}
                >
                  Show less
                </Button>
              )}
            </Col>
          </Row>
        </Container>
      </Layout>
    );
  }
}

export default Courses;
