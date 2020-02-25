import React from "react";
import LoadSpinner from "../components/LoadSpinner";
import { Redirect } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { Input, Button } from "../components/Form";
import API from "../utils/API";

class Login extends React.Component {

    state = {
        email: "",
        password: "",
        loaded: false
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

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

    handleLoginAttempt = (event) => {
        event.preventDefault();
        if (!this.state.email || !this.state.password) {
            return;
        }
        API.userLogin({
            email: this.state.email,
            password: this.state.password
        }).then(data => {
            console.log(data);
            if (data.status === 200) {
                this.setState({
                    loggedIn: true
                })
            }
        }).catch(err => {
            console.log(err);
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
        // Commented out for now since there is no checkLogin function
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
                        <h1 className="text-center mb-3" style={{ marginTop: 20 }}><i className="fas fa-sign-in-alt" style={{ marginRight: "15px" }}></i>Login</h1>
                        <form className="login">
                            <Input
                                type="input"
                                id="email-input"
                                label="Email"
                                name="email"
                                className="form-control"
                                onChange={this.handleInputChange}
                                placeholder="Enter Email"
                                required
                            />
                            <Input
                                type="password"
                                label="Password"
                                id="password-input"
                                name="password"
                                className="form-control"
                                onChange={this.handleInputChange}
                                placeholder="Enter Password"
                                required
                            />
                            <Button
                                type="submit"
                                className="btn btn-block"
                                onClick={this.handleLoginAttempt}
                            >Login</Button>
                        </form>
                    </Col>
                    <Col size="md-3" />
                </Row>
            </Container>
        )
    };




}

export default Login;