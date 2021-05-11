import React from "react";
import { Button, Card, CardGroup, Jumbotron } from "react-bootstrap";
import Layout from "./shared/Layout";

const Jumbo = () => {
  return (
    <>
      <Jumbotron>
        <h1>Welcome to Project Explorer</h1>
        <p>
          Project Explorer is a repository for final year projects across all
          departments at your institution. You can submit your project and
          search projects submitted by others to learn from.
        </p>
        <Button variant="primary">Get Started</Button>{" "}
        <Button variant="secondary">Login</Button>
      </Jumbotron>
    </>
  );
};

const Showcase = ({ props }) => {
  return (
    <>
      <CardGroup className="showcase">
        {props
          .reverse()
          .slice(0, 4)
          .map((project) => {
            const { abstract, authors, id, name, tags } = project;

            return (
              <Card key={id}>
                <Card.Body>
                  <Card.Title>
                    <Card.Link href={`/project/${id}`}>{name}</Card.Link>
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {authors}
                  </Card.Subtitle>
                  <Card.Text>{abstract}</Card.Text>
                  <Card.Link href="#">{tags}</Card.Link>
                </Card.Body>
              </Card>
            );
          })}
      </CardGroup>
      <br />
    </>
  );
};

const Home = (props) => {
  return (
    <Layout us={props.us}>
      <main className="container">
        <Jumbo />
        <Showcase {...props} />
      </main>
    </Layout>
  );
};

export default Home;
