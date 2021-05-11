import React from "react";
import Layout from "./shared/Layout";
import { Alert, Button, Form } from "react-bootstrap";

const BuildForm = ({ zinny, err }) => {
  let showAlert = false;
  err.length > 0 ? (showAlert = true) : (showAlert = false);
  return (
    <>
      <div className="mx-auto w-50 p-3 mw-70">
        <h2>Reset Password</h2>
        <Form id="loginForm" method="post" action="/resetpassword">
          <Alert
            className="alert alert-danger"
            variant="danger"
            show={showAlert}
          >
            {err}
          </Alert>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>New Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              name="password"
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
            />
          </Form.Group>
          <Form.Control
            type="text"
            name="email"
            defaultValue={`${zinny}`}
            style={{ display: "none" }}
          />

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
};

const ResetPassword = (props) => {
  return (
    <Layout us={props.us}>
      <BuildForm {...props} />
    </Layout>
  );
};

export default ResetPassword;
