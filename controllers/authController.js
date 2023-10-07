import userModel from '../models/userModel.js'

const registerController = async (req, res) => {
     try {
          const { name, email, password } = req.body
          // console.log(name)

          //validate
          if (!name) {
               return res.status(400).send({
                    success: false,
                    message: 'Please provide name'
               })
          }
          if (!email) {
               return res.status(400).send({
                    success: false,
                    message: 'Please provide email'
               })
          }
          if (!password) {
               return res.status(400).send({
                    success: false,
                    message: 'Please provide password'
               })
          }

          const existingUser = await userModel.findOne({ email })
          if (existingUser) {
               return res.status(200).send({
                    success: false,
                    message: 'Already registered user, please login'
               })
          }

          const user = await userModel.create({ name, email, password })
          res.status(201).send({
               success: true,
               message: 'User created successfully'
          })
     }
     catch (err) {
          console.log(err)
          res.status(400).send({
               message: 'Error in registerController',
               success: false,
               err
          })
     }
}

export default registerController