
const express = require('express')
const router = express.Router();
const {check} = require('express-validator')
const {createCategory,updateCategory,deleteCategory,getAllCategories} = require('../controllers/category')
const {auth,checkEmploye} = require('../middleware/auth')
router.post('/create/category',[check("name","name is required").not().isEmpty()],auth,checkEmploye,createCategory)
router.get("/allCategories",auth,checkEmploye,getAllCategories)
router.delete("/delete/category/:id",auth,checkEmploye,deleteCategory)
router.put("/update/category/:id",auth,checkEmploye,updateCategory)

module.exports = router;