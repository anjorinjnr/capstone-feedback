import React, { useState } from "react";
import Layout from "./shared/Layout";
import { Alert, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router";

const BuildForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const myAlert = document.getElementById("myAlert");
  let history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let regInfo = {
      email: email,
      password: password,
    };

    fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(regInfo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "ok") {
          document.cookie = `uid=${response.data.id}; domain=; path=/ `;
          history.push("/");
        } else {
          myAlert.style.display = "block";
          let errorData = `<b>Invalid email/password</b>`;
          myAlert.innerHTML = errorData;
        }
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      <div class="mx-auto w-50 p-3 mw-70">
        <h1>Login</h1>
        <Form onSubmit={handleSubmit}>
          <Alert
            variant="danger"
            style={{ display: "none" }}
            id="myAlert"
          ></Alert>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </>
  );
};

const Login = () => {
  return (
    <Layout>
      <BuildForm />
    </Layout>
  );
};

export default Login;
