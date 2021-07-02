const User = require("../models/user");
const EMPLOYE = require("../models/employe");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require("dotenv").config();
const { check, validationResult } = require("express-validator");
exports.getUser = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};
exports.signin = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  let user =await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({ error:"Invalid credential"  });
  }
  const isMatch = bcrypt.compare(req.body.password,user.password);
  if(!isMatch){
    return res.status(400).json({error :  "Invalid credential"  })
  }
  jwt.sign({
    user: { id: user._id }
  }, process.env.SECRET, {
    expiresIn: '7d'
  }, (err, token) => {
    if (err) throw err

    res.json({ token })
  })
};