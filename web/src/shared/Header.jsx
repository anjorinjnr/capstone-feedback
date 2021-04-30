import React, { useState } from "react";
import { Button, Form, FormControl, Nav, Navbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Header = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
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
          const { firstname } = res;
          setShow(true);
          setName(`Hi, ${firstname}`);
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
            {show ? (
              <>
                <Nav.Link id="logout" href="/" onClick={handleLogout}>
                  Logout
                </Nav.Link>
                <Navbar.Text id="username">{name}</Navbar.Text>
              </>
            ) : (
              <>
                <Nav.Link href="/signup">Sign Up</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <br />
    </>
  );
};

export default Header;
