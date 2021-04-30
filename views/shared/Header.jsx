import React from "react";
import { Button, Form, FormControl, Nav, Navbar } from "react-bootstrap";

const Header = (props) => {
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
            {props.us ? (
              <>
                <Nav.Link id="logout" href="/logout">
                  Logout
                </Nav.Link>
                <Navbar.Text id="username">{`Hi ${props.us.firstname}`}</Navbar.Text>
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
