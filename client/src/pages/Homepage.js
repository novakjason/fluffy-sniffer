import React from "react";
import LoadSpinner from "../components/LoadSpinner";
import { Redirect } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
// import { Input, Button } from "../components/Form";
import API from "../utils/API";

class Homepage extends React.Component {

  state = {
    redirect: false,
    redirectId: null,
    redirectData: {},
    loaded: false
  }

  // Work in progress function for handling errors
  handleError = err => {
    console.log(err);
  };

  // When a form field's value changes, update state to reflect that
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  checkLoginStatus = () => {
    API.userLoginCheck()
      .then(resp => {
        console.log(resp.data);
        this.setState({
          user: resp.data.user,
          loaded: true
        });
      });
  };


  componentDidMount() {
    // Commented out for now since there is no checkLogin function
    // this.checkLoginStatus();

    // Show the page after a 1s load phase
    setTimeout(() => {
      this.setState({
        loaded: true
      })
    }, 1000)
  }

  render() {

    if (!this.state.loaded) {
      return (<LoadSpinner />)
    }


    if (this.state.loaded && !this.state.user) {
      return (
        <Redirect to="/" />
      )
    }


    // Refer to the redirect-related variables in state
    const { redirect, redirectId } = this.state;
    // If redirect is true (that is, we've got some user data that's been posted)
    if (redirect) {
      // Then return a redirect component
      return < Redirect to={{
        // To the homepage page for this specific user
        pathname: `/app/user/${redirectId}`,
        // Also pass the user data to that page
        state: { userId: redirectId }
      }}
      />
    }


    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <h1 style={{ textAlign: "center", margin: "10px auto" }}>New Customer</h1>
          </Col>
        </Row>
        <Row>
          <Col size="md-1" />
          <Col size="md-10" style={{ marginBottom: "50px" }}>
            <h1>Congratulations, you're logged in.</h1>
          </Col>
          <Col size="md-1" />
        </Row>
      </Container >
    )
  };

}

export default Homepage;
