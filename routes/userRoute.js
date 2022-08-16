const express = require('express');
const router = express.Router()
const userController = require('./../controllers/userController');
const authController = require('./../controllers/authController');
const bugController = require('./../controllers/bugController')


// Login tabs and actions
router.post('/login', authController.loginIn, authController.justloggedin);
router.get('/login', (req, res) => {
    res.render("login/login")
})
router.get('/logout', authController.logout);

// Admin tabs and actions
router
.route("/")
.get(authController.loginedCheck, authController.levelOfLogin("Super-Admin","Admin"), userController.getAllUsers)

router
.route("/create/:id")
.get( authController.loginedCheck, userController.createNewUser)

router
.route("/create")
.post(authController.loginedCheck, userController.createUser);

router
.route("/update/:id")
.get( authController.loginedCheck, userController.updateUser)
.put(authController.loginedCheck, userController.updateUserData)

router
.route("/delete/:id")
.delete(authController.loginedCheck, bugController.deleteUsersBug, userController.deleteUser);

router
.route("/profile/:id")
.get(authController.loginedCheck, userController.profile)

router
.route("/filter/")
.get(authController.loginedCheck, userController.filterAndSort)







// sort filtered routes

router
.route("/filtered/admin")
.get(authController.loginedCheck, authController.levelOfLogin("Super-Admin","Admin"), userController.getOnlyAdmin)

router
.route("/filtered/user")
.get(authController.loginedCheck, authController.levelOfLogin("Super-Admin","Admin"), userController.getOnlyUser)








module.exports = router