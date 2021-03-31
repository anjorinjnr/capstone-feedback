import React from "react";
import { Button, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Header = () => {
  const every = document.getElementById("every");

  let history = useHistory();

  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  if (document.cookie) {
    const cookieValue = getCookie("uid");
    let cookieExists = cookieValue ? true : false;
    if (cookieExists) {
      fetch(`/api/users/${cookieValue}`)
        .then((res) => res.json())
        .then((res) => {
          document.getElementById("signup").style.display = "none";
          document.getElementById("login").style.display = "none";
          document.getElementById("logout").style.display = "block";
          document.getElementById("username").style.display = "block";

          document.getElementById(
            "username"
          ).innerText = `Hi, ${res.firstname}`;
        })
        .catch((e) => console.log(e));
    }
  }

  function handleLogout(event) {
    document.cookie = "uid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    history.push("/");
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Navbar.Brand href="#home">Project Explorer</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Form inline>
            <FormControl
              type="text"
              placeholder="Search Projects"
              className="mr-sm-2"
            />
            <Button variant="outline-light">Search</Button>
          </Form>
          <Nav className="mr-auto">
            <Nav.Link href="#features">Submit</Nav.Link>
          </Nav>
          <Nav id="every">
            <Nav.Link href="/signup" id="signup">
              Sign Up
            </Nav.Link>
            <Nav.Link href="/login" id="login">
              Login
            </Nav.Link>
            <Nav.Link
              href="/"
              style={{ display: "none" }}
              id="logout"
              onClick={handleLogout}
            >
              Logout
            </Nav.Link>
            <Navbar.Text
              id="username"
              style={{ display: "none" }}
            ></Navbar.Text>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <br />
    </>
  );
};

export default Header;
