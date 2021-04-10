const express = require('express');
const router = express.Router();
const {create, getById} = require("../services/project")
const user = require("../services/user")

router.get('/projects/submit', (req, res) => {    
const error = req.flash("error");    

  res.render("CreateProject", { err: error, us: req.session.user});
  !req.session.user && res.redirect("/login");
});

router.post('/projects/submit', (req, res) => {
    const tags = req.body.tags.split(",");
    const authors = req.body.authors.split(",");
    const {name, abstract} = req.body;
    const createdBy = req.session.user.id;

    const check = create({name, abstract, authors, tags, createdBy})

    if (check[0]){
    res.redirect("/");
  }
  else{
    req.flash("error", check[1]);
    res.redirect(303, '/projects/submit');
  } 
  
});


router.get('/project/:id', (req, res) => {

    const check = getById(req.params.id)
  res.render("Project", {us: req.session.user, dat: check, dat2: user.getById(check.createdBy)});
});

module.exports = router;