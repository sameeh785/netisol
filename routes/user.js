const express = require("express");
const router = express.Router();
const { check} = require('express-validator')
const {createUser} = require('../controllers/user')

router.post("/signup", [
  check("name", "Name is required").not().isEmpty(),
  check("email", "Enter a valid Email").isEmail(),
  check('password',"Enter a stronge password").isLength({min : 6})
],createUser);

module.exports = router;
