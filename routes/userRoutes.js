const userController = require("../controller/userController")
const express =  require("express")
const router =  express.Router()

router.post("/signup",userController.signup)
router.post('/signin',userController.signin)
router.post("/logout",userController.logout)

module.exports = router
