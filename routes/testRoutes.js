import express from 'express'
import testPostController from '../controllers/testController.js'

// router object
const router = express.Router()

//routes creation
router.post('/test-post', testPostController)

export default router