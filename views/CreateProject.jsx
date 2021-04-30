import React from "react";
import { Alert, Button, Form } from "react-bootstrap";
import Layout from "./shared/Layout";

const CreateProjectForm = ({ err }) => {
  let showAlert = false;
  err.length > 0 ? (showAlert = true) : (showAlert = false);

  return (
    <>
      <div className="mx-auto w-50 p-3 mw-70">
        <h3>Submit Project</h3>
        <Form method="post" action="/projects/submit" id="createProjectForm">
          <Alert
            className="alert alert-danger"
            variant="danger"
            show={showAlert}
          >
            {err.map((text) => {
              return (
                <>
                  {text}
                  <br />
                </>
              );
            })}
          </Alert>
          <Form.Group>
            <Form.Label>Project Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter project name"
              name="name"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Project Abstract</Form.Label>
            <Form.Control as="textarea" rows={5} name="abstract" />
          </Form.Group>

          <Form.Group>
            <Form.Label>Author(s)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter author names (seperated by comma)"
              name="authors"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Tag(s)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Use # to seperate projects with different topics (e.g #javascript #mongodb) "
              name="tags"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Continue
          </Button>
        </Form>
        <br />
      </div>
    </>
  );
};
const CreateProject = (props) => {
  return (
    <Layout us={props.us}>
      <CreateProjectForm {...props} />
    </Layout>
  );
};

export default CreateProject;
