const express = require('express');
const Bug = require('../models/bugModel');
const router = express.Router()
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');


router.post('/signUp', authController.signup);
router.get('/login', (req, res) => {
    res.render("login/login")
})
router.post('/login', authController.loginIn);

router
.route("/Create/:id")
.get( userController.test2)

router
.route("/")
.get(/*authController.loginedCheck, authController.levelOfLogin("admin"),*/ userController.getAllUsers)
.post(userController.createUser);

router
.route("/filtered/admin")
.get(/*authController.loginedCheck, authController.levelOfLogin("admin"),*/ userController.getOnlyAdmin)

router
.route("/filtered/user")
.get(/*authController.loginedCheck, authController.levelOfLogin("admin"),*/ userController.getOnlyUser)

router
.route("/:id")
.get(userController.getUser)
.patch(userController.updateUser)
.delete(userController.deleteUser);






module.exports = router