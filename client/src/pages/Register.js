import React from "react";
import LoadSpinner from "../components/LoadSpinner";
import { Redirect } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Input, Button } from "../components/Form";
import API from "../utils/API";

class Register extends React.Component {

    state = {
        username: "",
        password: ""
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleRegistration = event => {
        event.preventDefault();
        if (!this.state.username || !this.state.password) {
            return;
        }
        API.addNewUser({
            username: this.state.username,
            password: this.state.password
        })
            .then(newUser => {
                console.log(newUser);
                API.loginUser(newUser)
            })
            .catch(err => console.log(err));
    }

    checkLoginStatus = () => {
        API.userLoginCheck()
            .then(resp => {
                if (resp.data.user) {
                    console.log(resp.data);
                    this.setState({
                        user: resp.data.user,
                        loaded: true
                    })
                }
                else if (!this.state.loaded) {
                    this.setState({
                        loaded: true
                    })
                }
            })
    };

    componentDidMount() {
        // Show the page after a 1s load phase
        setTimeout(() => {
          this.setState({
            loaded: true
          })
        }, 1000)
      }

    render() {

        // this.checkLoginStatus();

        if (!this.state.loaded) {
            return (<LoadSpinner />)
        }


        if (this.state.loaded && this.state.user) {
            return (
                <Redirect to="/app" />
            )
        }

        return (
            <Container fluid>
                <Row className="max-width: 900px; margin:auto;">
                    <Col size="md-3" />
                    <Col size="md-6">
                        <h1 className="text-center mb-3" style={{ marginTop: 20 }}><i className="fas fa-sign-in-alt" style={{ marginRight: "15px" }}></i>Register</h1>
                        <form className="login">
                            <div className="form-group">
                                <label htmlFor="username-input">Username</label>
                                <Input type="input" id="username-input" name="username" className="form-control" onChange={this.handleInputChange} placeholder="Enter Email" required />
                                <div className="form-group">
                                    <label htmlFor="password-input">Password</label>
                                    <Input type="password" id="password-input" name="password" className="form-control" onChange={this.handleInputChange} placeholder="Enter Password" required />
                                    <Button type="submit" className="btn btn-block" onClick={this.handleRegistration}>Register</Button>
                                    <p className="lead mt-4">
                                        Already have an account? <a href="/">Login</a>.
                                    </p>
                                </div>
                            </div>
                        </form>
                    </Col>
                    <Col size="md-3" />
                </Row>
            </Container>
        )
    }




}

export default Register;