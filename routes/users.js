const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware/isLoggedIn.js");
const UserController = require("../Controller/User.js")

router.get("/signup", UserController.RenderSignUpForm);

router.post("/signup", wrapAsync(UserController.CreateSignUp));

router.get("/login",UserController.RenderLoginForm);

router.post("/login",saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  UserController.CreateLogin);

  router.get("/logout",UserController.DestroyUser);


module.exports = router;