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
.route("/filter/")
.get(bugController.FilterTest)

router
.route("/filtered/:id")
.get( bugController.UserBugs)

router
.route("/Create/:id")
.get( bugController.test2)



router
.route("/Update/:id")
.get( bugController.testUpdate)

router
.route("/look")
.get( authController.loginedCheck, bugController.filterAllBugs)

router
.route("/bug-details/:id")
.get( bugController.testDetails)

router
.route("/:id")
.post( bugController.createBug)
.get(bugController.getBug)
.put(bugController.updateBug)
.delete(/*authController.loginedCheck, authController.bugCreator,*/ bugController.deleteBug)




module.exports = router