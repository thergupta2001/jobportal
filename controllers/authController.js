import userModel from '../models/userModel.js'
// import bodyParser from 'body-parser';

const registerController = async (req, res, next) => {

     const { name, email, password } = req.body
     // console.log(name)

     //validate
     if (!name) {
          // return res.status(400).send({
          //      success: false,
          //      message: 'Please provide name'
          // })
          next('Name is required')
     }
     if (!email) {
          // return res.status(400).send({
          //      success: false,
          //      message: 'Please provide email'
          // })
          next('Email is required')
     }
     if (!password) {
          // return res.status(400).send({
          //      success: false,
          //      message: 'Please provide password'
          next('Password is required')
     }

     // const existingUser = await userModel.findOne({ email })
     // if (existingUser) {
     //      // return res.status(200).send({
     //      //      success: false,
     //      //      message: 'Already registered user, please login'
     //      // })
     //      next('User already exists')
     // }

     const user = await userModel.create({ name, email, password })

     //token
     const token = user.createJWT()

     res.status(201).send({
          success: true,
          message: 'User created successfully',
          user,
          token
     })
}

export default registerController

// const loginController = async(req, res, next) => {
//      const { email, password } = req.body

//      //validate
//      if(!email || !password){
//           next('Please fill all the fields correctly')
//      }

//      //find user
//      const user = await userModel.findOne({email})
//      if(!user){
//           next('Invalid username or password')
//      }

//      const isMatch = await user.comparePassword(password)
//      if(!isMatch){
//           next('Invalid username or password')
//      }
//      const token = user.createJWT()
//      res.status(200).json({
//           success: true,
//           message: 'Logged in successfully',
//           user,
//           token
//      })
// }