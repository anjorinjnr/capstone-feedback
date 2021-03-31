import React, { useState } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router";
import Layout from "./shared/Layout";

const CreateProjectForm = () => {
  let history = useHistory();
  let cookieCheck = document.cookie
    .split(";")
    .some((item) => item.trim().startsWith("uid="));
  if (!cookieCheck) {
    history.push("/login");
  }

  const [name, setName] = useState("");
  const [abstract, setAbstract] = useState("");
  const [authors, setAuthors] = useState("");
  const [tags, setTags] = useState("");

  const myAlert = document.getElementById("myAlert");

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "name":
        setName(value);
        break;
      case "abstract":
        setAbstract(value);
        break;
      case "authors":
        setAuthors(value);
        break;
      case "tags":
        setTags(value);
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tagsInput = tags.split(",");
    const authorsInput = authors.split(",");

    let regInfo = {
      name: name,
      abstract: abstract,
      tags: tagsInput,
      authors: authorsInput,
    };

    console.log(regInfo);

    fetch("/api/projects", {
      method: "POST",
      body: JSON.stringify(regInfo),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === "ok") {
          history.push("/");
        } else {
          myAlert.style.display = "block";
          let errorData = response.errors
            .map((item) => {
              return `${item}<br>`;
            })
            .join("");
          myAlert.innerHTML = errorData;
        }
      })
      .catch((e) => console.log(e));
  };
  return (
    <>
      <div className="mx-auto w-50 p-3 mw-70">
        <h3>Submit Project</h3>
        <Form onSubmit={handleSubmit}>
          <Alert
            variant="danger"
            style={{ display: "none" }}
            id="myAlert"
          ></Alert>
          <Form.Group>
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter project name"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Project Abstract</Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              name="abstract"
              value={abstract}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Author(s)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter author names (seperated by comma)"
              name="authors"
              value={authors}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Tag(s)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Use # to seperate projects with different topics (e.g #javascript #mongodb) "
              name="tags"
              value={tags}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Continue
          </Button>
        </Form>
      </div>
    </>
  );
};
const CreateProject = () => {
  return (
    <Layout>
      <CreateProjectForm />
    </Layout>
  );
};

export default CreateProject;
