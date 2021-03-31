import React, { useState, useEffect } from "react";
import { Alert, Button, Col, Form } from "react-bootstrap";
import Layout from "./shared/Layout";
import { useHistory } from "react-router-dom";

const MainSignup = () => {
  const [programs, setPrograms] = useState([]);
  const [gradYears, setgradYears] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [prog, setProg] = useState("");
  const [matric, setMatric] = useState("");
  const [gyears, setGyears] = useState("");

  let myAlert = document.getElementById("myAlert");
  let history = useHistory();

  useEffect(() => {
    fetch("/api/programs")
      .then((res) => res.json())
      .then((res) => {
        setPrograms(res);
      });

    fetch("/api/graduationYears")
      .then((response) => response.json())
      .then((res) => setgradYears(res));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "firstName":
        setFirstname(value);
        break;
      case "lastName":
        setLastname(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      case "program":
        setProg(value);
        break;
      case "matricNumber":
        setMatric(value);
        break;
      case "graduationYear":
        setGyears(value);
        break;
    }
  };

  const handlesubmit = (e) => {
    e.preventDefault();

    let regInfo = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      matricNumber: matric,
      program: prog,
      graduationYear: gyears,
    };

    fetch("/api/register", {
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
          let errorData = response.errors.map((item) => {
            return `${item}<br>`;
          });
          let errDa = errorData.join("");
          myAlert.innerHTML = errDa;
        }
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <div className="mx-auto w-50 p-3 mw-70">
        <h1>Signup</h1>
        <Form onSubmit={handlesubmit}>
          <Alert
            variant="danger"
            style={{ display: "none" }}
            id="myAlert"
          ></Alert>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>First Name:</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={firstname}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Last Name:</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={lastname}
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
              />
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} xs={6}>
              <Form.Label>Program:</Form.Label>
              <Form.Control
                as="select"
                value={prog}
                name="program"
                onChange={handleChange}
              >
                <option>Select Option</option>
                {programs.map((program) => (
                  <option key={program}>{program}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Matric Number:</Form.Label>
              <Form.Control
                name="matricNumber"
                value={matric}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Graduation Year:</Form.Label>
              <Form.Control
                as="select"
                name="graduationYear"
                value={gyears}
                onChange={handleChange}
              >
                <option>Select Option</option>
                {gradYears.map((year) => (
                  <option key={year}>{year}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form.Row>

          <Button variant="primary" type="submit">
            Sign Up
          </Button>
        </Form>
      </div>
    </>
  );
};

const Signup = () => {
  return (
    <Layout>
      <MainSignup />
    </Layout>
  );
};

export default Signup;
