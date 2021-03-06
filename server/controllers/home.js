const express = require("express");
const router = express.Router();

const project = require("../services/project");

router.get("/", async (req, res) => {
  const projects = await project.getAll();
  const user = req.session.user;

  res.render("Home", { props: projects, us: user });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
