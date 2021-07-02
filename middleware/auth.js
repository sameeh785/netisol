const jwt = require("jsonwebtoken");
const User = require("../models/user");
const EMPLOYE = require('../models/employe')
require("dotenv").config();
exports.auth = (req, res, next) => {
  console.log("User check")
  const token = req.header("x-auth-token");
  console.log(token)
  if (!token) {
    return res.status(401).json({ error: "Unauthorized User" });
  }
  const decoded = jwt.verify(token, process.env.SECRET);
  req.user = decoded.user;
  next();
};

exports.checkAdmin = async (req, res, next) => {
  console.log("Admin check")
  const { id } = req.user;
  const user = await User.findById(id);
  if (user.role !== 2) {
    return res.status(401).json({ error: "Unauthorized Access" });
  }

  next();
};
exports.checkEmploye = async(req,res,next) =>{
  console.log(req.user.id)
  const employe = await EMPLOYE.findById(req.user.id).exec();
  console.log(employe)
  if(employe.role === 1){
    next()
  }
  else{
    return res.status(400).json({msg : "unathorized access"})
  }
}