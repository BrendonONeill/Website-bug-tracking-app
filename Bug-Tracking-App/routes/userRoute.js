const express = require('express');
const router = express.Router()
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const bugController = require('./../controllers/bugController')


router.get('/logout', authController.logout);
router.get('/login', (req, res) => {
    res.render("login/login")
})
router.post('/login', authController.loginIn, authController.loginedCheck, bugController.test);

router
.route("/Create/:id")
.get( userController.test2)

router
.route("/")
.get(authController.loginedCheck, authController.levelOfLogin("admin"), userController.getAllUsers)
.post(userController.createUser);

router
.route("/profile/:id")
.get(authController.loginedCheck, userController.profile)

router
.route("/filtered/admin")
.get(authController.loginedCheck, authController.levelOfLogin("admin"), userController.getOnlyAdmin)

router
.route("/filtered/user")
.get(authController.loginedCheck, authController.levelOfLogin("admin"), userController.getOnlyUser)

router
.route("/:id")
.get(userController.getUser)
.patch(userController.updateUser)
.delete(userController.deleteUser);






module.exports = router