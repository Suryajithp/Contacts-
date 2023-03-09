const express = require('express')
const router = express.Router()
const userController = require('../controller/user_controller')
const {verifyJWT} = require('../controller/Authenticate')


// jwt 
router.get('/isUserAuth', verifyJWT, userController.jwt)

// create user
router.post('/signup',userController.Signup)

// login
router.post('/',userController.Login)

module.exports = router;