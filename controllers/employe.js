const EMPLOYE = require("../models/employe");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
exports.getUser = async (req, res) => {
  const user = await EMPLOYE.findById(req.user.id).select("-password");
  res.json(user);
};
exports.createEmploye = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  try {
    let user = await EMPLOYE.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Employe already exit" });
    }
    let newUser = new EMPLOYE({ ...req.body });
    let salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    await newUser.save();
    res.json({ msg: "Employe is created successfully" });
  } catch (e) {
    console.log(e);
    res.status(500).send("Server error");
  }
};

exports.employeSigin = async (req, res) => {
  console.log("sami");
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  let user = await EMPLOYE.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({ error: "Invalid credential" });
  }
  const isMatch = bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: "Invalid credential" });
  }
  jwt.sign(
    {
      user: { id: user._id },
    },
    process.env.SECRET,
    {
      expiresIn: "7d",
    },
    (err, token) => {
      if (err) throw err;

      res.json({ token });
    }
  );
};

exports.deleteEmploy = async (req, res) => {
  const user = await EMPLOYE.findByIdAndRemove(req.params.id);
  if (!user) {
    return res.status(400).json({ msg: "Unable to delete employe" });
  }
  res.json({msg : "employe is deleted successfully"})
};


exports.UpdateEmploy = async(req,res) =>{

  console.log(req.params.id)

 const user = await EMPLOYE.findByIdAndUpdate(req.params.id,{...req.body},{new : true});
 console.log(user)
 if(!user){
   return res.status(400).json({msg : "Unable to update the employ"})
 }
 res.json({
   msg : "ok"
 })
}

exports.getAllEmployes = async(req,res) =>{

  const employes = await EMPLOYE.find({}).exec()
  if(!employes){
    return res.status(404).json({msg : "Create Employes"})
  }
  res.json(employes)

}