import express from 'express'
import registerController from '../controllers/authController.js'
import loginController from '../controllers/loginController.js'

//router object
const router = express.Router()

//routes REGISTER
router.post('/register', registerController)

//routes LOGIN
router.post('/login', loginController)

export default router