const express = require('express')
const router = express.Router()
const bugController = require('./../controllers/bugController')
const authController = require('./../controllers/authController');


router
.route("/")
.get( bugController.test)
//authController.loginedCheck,

router
.route("/filtered/public")
.get( bugController.publicBugs)

router
.route("/filtered/:id")
.get( bugController.UserBugs)

router
.route("/Create/:id")
.get( bugController.test2)

router
.route("/look")
.get( authController.loginedCheck, bugController.filterAllBugs)



router
.route("/:id")
.post( express.urlencoded({extended: true}), bugController.createBug)
.get(bugController.getBug)
.patch(bugController.updateBug)
.delete(authController.loginedCheck, authController.bugCreator, bugController.deleteBug)




module.exports = router