const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {createEmploye,employeSigin ,getUser,deleteEmploy,UpdateEmploy,getAllEmployes} = require('../controllers/employe')
const {auth,checkAdmin} = require('../middleware/auth')
//get Employe
router.get("/getEmploye",auth, getUser);
//employ signup
router.post(
  "/create/employe",
  auth,checkAdmin,
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Enter a valid Email").isEmail(),
    check("password", "Enter a stronge password").isLength({ min: 6 }),
  ],
  createEmploye
);

//Employe signin
router.post('/employe/sigin',[ check("email", "Enter a valid email").isEmail(),
check("password", "Password is required").exists(),],employeSigin )
//Employ update
router.put('/employe/:id',auth,checkAdmin,UpdateEmploy)
//Get all employes
router.get("/getAllEmployes",auth,checkAdmin,getAllEmployes)
// Employe delete
router.delete('/employe/:id',auth,checkAdmin,deleteEmploy)

module.exports = router;
