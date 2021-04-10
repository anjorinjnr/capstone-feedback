const express = require('express');
const {getPrograms, getGradYears} =require("../services/school");
const user =require("../services/user")

const router = express.Router();

router.get('/signup', (req, res) => {
    const programs = getPrograms();
    const graduationYears= getGradYears();

    const error = req.flash("error");
    const user = req.session.user;    

  res.render("Signup", {program: programs, graduationYear: graduationYears, err: error, us: user })
});

router.post('/signup', (req, res) => {
  const firstname= req.body.firstName;
 const  lastname= req.body.lastName

  const {email, password, program, matricNumber, graduationYear} = req.body;
  
  const check = user.create({firstname, lastname, email, password, matricNumber, program, graduationYear});

  if (check[0]){
     req.session.user = check[1];
    res.redirect("/");
  }
  else{
    req.flash("error", check[1]);
    res.redirect(303, '/signup');
  }
      
});

router.get("/login",(req,res)=>{

  const error = req.flash("error");
  const user = req.session.user; 

  res.render("Login", {err: error, us: user})

})

router.post("/login",(req,res)=>{

  const {email, password} =req.body

  const check = user.authenticate(email,password)

  if (check[0]){
    req.session.user = check[1];
    res.redirect("/");
  }
  else{
    req.flash("error", check[1][0]);
    res.redirect(303, '/login');
  }
  
})

module.exports = router;