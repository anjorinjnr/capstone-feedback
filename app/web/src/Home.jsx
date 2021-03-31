import React, { useEffect, useState } from "react";
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

const Showcase = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((res) => setProjects(res.slice(0, 4)));
  }, []);
  return (
    <>
      <CardGroup>
        {projects.map((project) => {
          const { abstract, authors, id, name, tags } = project;

          return (
            <Card>
              <Card.Body>
                <Card.Title>
                  <Card.Link href={`/projects/${id}`}>{name}</Card.Link>
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
    </>
  );
};

const Home = () => {
  return (
    <Layout>
      <main className="container">
        <Jumbo />
        <Showcase />
      </main>
    </Layout>
  );
};

export default Home;
