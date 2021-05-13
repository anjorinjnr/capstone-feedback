const express = require("express");
const User = require("../models/user");
const session = require("express-session");
const passport = require("passport");

const facebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const router = express.Router();
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET;
const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// FaceBook Authentication

// router.use(
//   session({
//     secret: "ilovescotchscotchyscotchscotch",
//     resave: true,
//     saveUninitialized: true,
//   })
// );
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
        const { email, id, first_name, last_name } = profile._json;
        User.findOne({ email: email }, function (err, person) {
          if (err) {
            return done(err);
          }
          if (person) {
            return done(null, person);
          } else {
            let newUser = new User();
            newUser.firstname = first_name;
            newUser.lastname = last_name;
            newUser.email = email;
            newUser.matricNumber = id;
            newUser.setPassword(id);

            newUser.save(function (err) {
              if (err) {
                throw err;
              }
              return done(null, newUser);
            });
          }
        });
      });
    }
  )
);

passport.serializeUser(function (person, done) {
  session.user = person;
  done(null, person.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: "email" })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

// Google Authentication

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // There's no need for process.nextTick here
      const { sub, name, given_name, family_name, email } = profile._json;
      User.findOne({ email: email }, function (err, person) {
        if (err) {
          return done(err);
        }
        if (person) {
          return done(null, person);
        } else {
          let newUser = new User();
          newUser.firstname = given_name;
          newUser.lastname = family_name;
          newUser.email = email;
          newUser.matricNumber = sub;
          newUser.setPassword(name);

          newUser.save(function (err) {
            if (err) {
              throw err;
            }
            return done(null, newUser);
          });
        }
      });
    }
  )
);

passport.serializeUser(function (person, done) {
  // this is not doing what you think it is.
  // to add  something to the session you need the req object so you can do
  // req.session.user = person.

  // Also there you mixing two patterns
  // manually adding the user to the server vs
  // letting passport handle that for you.
  session.user = person; 

  done(null, person.sub);
});

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // the user will already in the req object here
    // so manually add it to the session you can do this
    req.session.user = req.user;
    res.redirect("/");
  }
);

module.exports = router;
