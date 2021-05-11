import React from "react";
import Layout from "./shared/Layout";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Facebook, Google } from "react-bootstrap-icons";

const BuildForm = ({ err }) => {
  let showAlert = false;
  err.length > 0 ? (showAlert = true) : (showAlert = false);

  return (
    <>
      <div className="mx-auto w-50 p-3 mw-70">
        <h1>Login</h1>

        <Form id="loginForm" method="post" action="/login">
          <Alert
            className="alert alert-danger"
            variant="danger"
            show={showAlert}
          >
            {err}
          </Alert>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" name="email" />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
          <a
            href="/forgotpassword"
            className="link-primary"
            style={{ marginLeft: 15 + "px" }}
          >
            Forgot Password?
          </a>
        </Form>
        <br />

        <Container>
          <Row>
            <Col></Col>
            <Col>
              <Button
                href="/auth/facebook"
                size="sm"
                style={{
                  backgroundColor: "#3b5998",
                  marginBottom: 5 + "px",
                  width: 180 + "px",
                }}
              >
                <Facebook color="#fff" size="30" /> Login with Facebook
              </Button>
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col></Col>
            <Col>
              <Button
                href="/auth/google"
                size="sm"
                style={{ backgroundColor: "#DB4437", width: 180 + "px" }}
              >
                <Google color="	#fff" size="30" /> Login with Google
              </Button>
            </Col>
            <Col></Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

const Login = (props) => {
  return (
    <Layout us={props.us}>
      <BuildForm {...props} />
    </Layout>
  );
};

export default Login;
