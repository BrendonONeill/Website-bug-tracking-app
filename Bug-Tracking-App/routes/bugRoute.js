const express = require('express')
const router = express.Router()
const bugController = require('./../controllers/bugController')
const authController = require('./../controllers/authController');


router
.route("/")
.get( authController.loginedCheck, bugController.test)


router
.route("/filtered/public")
.get( authController.loginedCheck, bugController.publicBugs)


router
.route("/filter/")
.get(authController.loginedCheck, bugController.FilterTest)

router
.route("/filtered/:id")
.get(authController.loginedCheck, bugController.UserBugs)

router
.route("/Create/:id")
.get(authController.loginedCheck, bugController.test2)



router
.route("/Update/:id")
.get(authController.loginedCheck, bugController.testUpdate)

router
.route("/look")
.get( authController.loginedCheck, bugController.filterAllBugs)

router
.route("/bug-details/:id")
.get(authController.loginedCheck, bugController.testDetails)

router
.route("/:id")
.post( bugController.createBug)
.get(bugController.getBug)
.put(bugController.updateBug)
.delete(/*authController.loginedCheck, authController.bugCreator,*/ bugController.deleteBug)




module.exports = router