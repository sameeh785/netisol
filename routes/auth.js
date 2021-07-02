const express = require("express");
const router = express.Router();
const {auth} = require('../middleware/auth')
const {signin,getUser} = require("../controllers/auth");
const { check } = require("express-validator");
router.get("/getuser",auth, getUser);
router.post(
  "/signin",
  [
    check("email", "Enter a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  signin
);
module.exports = router;
