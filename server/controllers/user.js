const express = require("express");
const { getPrograms, getGradYears } = require("../services/school");
const user = require("../services/user");
const session = require("express-session");
const passport = require("passport");
const person = require("../models/user");
const facebookStrategy = require("passport-facebook").Strategy;

const router = express.Router();
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;

router.get("/signup", (req, res) => {
  const programs = getPrograms();
  const graduationYears = getGradYears();

  const error = req.flash("error");
  const user = req.session.user;

  res.render("Signup", {
    program: programs,
    graduationYear: graduationYears,
    err: error,
    us: user,
  });
});

router.post("/signup", async (req, res) => {
  const firstname = req.body.firstName;
  const lastname = req.body.lastName;

  const { email, password, program, matricNumber, graduationYear } = req.body;

  const check = await user.create({
    firstname,
    lastname,
    email,
    password,
    matricNumber,
    program,
    graduationYear,
  });

  if (check[0]) {
    req.session.user = check[1];
    res.redirect("/");
  } else {
    req.flash("error", await check[1]);
    res.redirect(303, "/signup");
  }
});

router.get("/login", (req, res) => {
  const error = req.flash("error");
  const user = req.session.user;

  res.render("Login", { err: error, us: user });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const check = await user.authenticate(email, password);

  if (check[0]) {
    req.session.user = check[1];
    res.redirect("/");
  } else {
    req.flash("error", check[1][0]);
    res.redirect(303, "/login");
  }
});

router.get("/forgotpassword", (req, res) => {
  const user = req.session.user;
  const error = req.flash("error");
  res.render("ForgotPassword", { us: user, err: error });
});

router.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;
  const check = await user.getByEmail(email);

  if (check) {
    req.flash("zinny", check.email);
    res.redirect("/resetpassword");
  } else {
    req.flash("error", "Email does not exist");
    res.redirect(303, "/forgotpassword");
  }
});

router.get("/resetpassword", (req, res) => {
  const user = req.session.user;
  const zinny = req.flash("zinny");
  const error = req.flash("error");
  res.render("ResetPassword", { us: user, zinny: zinny, err: error });
});

router.post("/resetpassword", async (req, res) => {
  const { password, confirmPassword, email } = req.body;
  // if (password === confirmPassword) {
  //   const check = await user.getByEmailAndUpdate(email, password);
  // } else {
  //   req.flash("error", "Password do not match");
  //   res.redirect(303, "/resetpassword");
  // }

  // console.log(req.body);

  // const check = await user.getByEmailAndUpdate(name, password);
  // const ispass = await user.authenticate(emailKeeper.email, password);
  // console.log(ispass)
});

// FaceBook Authentication
router.use(
  session({
    secret: "ilovescotchscotchyscotchscotch",
    resave: true,
    saveUninitialized: true,
  })
);
router.use(passport.initialize());
router.use(passport.session());

passport.use(
  new facebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:4000/facebook/callback",
      profileFields: ["email", "id", "first_name", "last_name"],
    },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(async function () {
        console.log(profile._json);
      });
    }
  )
);

passport.serializeUser(function (User, done) {
  done(null, User);
});

passport.deserializeUser(function (id, done) {
  person.findById(id, function (err, user) {
    done(err, user);
  });
});

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

// Google Authentication

module.exports = router;
