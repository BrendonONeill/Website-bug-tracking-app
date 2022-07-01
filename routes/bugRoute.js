const express = require('express')
const router = express.Router()
const bugController = require('./../controllers/bugController')
const authController = require('./../controllers/authController');


router
.route("/")
.get( authController.loginedCheck, bugController.getBugsMain)

router
.route("/create/:id")
.get(authController.loginedCheck, bugController.createUserBug)
.post(authController.loginedCheck, bugController.createBug)

router
.route("/bug-details/:id")
.get(authController.loginedCheck, bugController.expandBugDetails)

router
.route("/update/:id")
.get(authController.loginedCheck, bugController.updateUserBug)
.put(authController.loginedCheck, bugController.updateBug)

router
.route("/delete/:id")
.delete( authController.loginedCheck, bugController.deleteBug)

router
.route("/filter/")
.get(authController.loginedCheck, bugController.filterAndSort)



// Look into probally just test code
router
.route("/filtered/public")
.get( authController.loginedCheck, bugController.publicBugs)



router
.route("/filtered/:id")
.get(authController.loginedCheck, bugController.UserBugs)

router
.route("/look")
.get( authController.loginedCheck, bugController.filterAllBugs)








module.exports = router