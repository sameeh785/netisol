const { check, validationResult } = require('express-validator')
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
require("dotenv").config();

exports.createUser = async(req,res) =>{
  console.log("sami")
    console.log(req.body)
    const {name,email,password} = req.body
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({error : errors.array()[0].msg})
    }
    try {
      let user = await User.findOne({email})
      if(user){
        return res.status(400).json({error : "user already exit"})
      }
      let newUser = new User({name,email,password})
      let salt = await bcrypt.genSalt(10)
      newUser.password = await bcrypt.hash(password,salt)
      await newUser.save()
      jwt.sign({
        user: { id: newUser._id }
      },process.env.SECRET,{
        expiresIn: '7d'
      }, (err, token) => {
        if (err) throw err
  
        res.json({ token })
      })
  
      
    }  catch (e) {
      console.log(e)
      res.status(500).send('Server error')
    }
  

}