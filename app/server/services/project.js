const Project = require("../models/project");
const { translateError } = require("../models/mongo_helper");

const create = async ({ name, abstract, authors, tags, createdBy }) => {
  const project = await new Project(name, abstract, authors, tags, createdBy);

  project
    .save()
    .then((res) => {
      console.log(res);
      return [true, res];
    })
    .catch((e) => {
      return [false, translateError(e)];
    });
};

/* Return project with specified id */
const getById = async (id) => {
  // populate projects with data from file.
  return await Project.findById(id);
};
/* Return all projects */
const getAll = async () => {
  // populate projects with data from file.
  return await Project.find();
};

module.exports = {
  getAll,
  create,
  getById,
};
