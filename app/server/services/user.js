const User = require("../models/user");
const { translateError } = require("../models/mongo_helper");

const create = async ({
  firstname,
  lastname,
  email,
  password,
  matricNumber,
  program,
  graduationYear,
}) => {
  const user = new User();
  user.firstname = firstname;
  user.lastname = lastname;
  user.email = email;
  user.matricNumber = matricNumber;
  user.program = program;
  user.graduationYear = graduationYear;
  user.setPassword(password);

  user
    .save()
    .then((res) => {
      console.log(res);
      return [true, user];
    })
    .catch((e) => {
      return [false, translateError(e)];
    });
};

/* Authenticate a user */
const authenticate = async (email, password) => {
  const user = new User();
  user.email = email;
  user.password = password;
  const result = await User.findOne({ email });

  return result && user.validPassword(result, user.password)
    ? [true, result]
    : [false, ["Invalid email/password"]];
};

/* Return user with specified id */
const getById = async (id) => {
  return await User.findById(id);
};

/* Return all users */
const getAll = async () => {
  return await User.find();
};

module.exports = {
  create,
  authenticate,
  getById,
  getAll,
};
