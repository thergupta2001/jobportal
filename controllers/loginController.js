import userModel from '../models/userModel.js'

const loginController = async(req, res, next) => {
     const { email, password } = req.body

     //validate
     if(!email || !password){
          next('Please fill all the fields correctly')
     }

     //find user
     const user = await userModel.findOne({email})
     if(!user){
          next('Invalid username or password')
     }

     //compare password
     const isMatch = await user.comparePassword(password)
     if(!isMatch){
          next('Invalid username or password')
     }
     const token = user.createJWT()
     res.status(200).json({
          success: true,
          message: 'Logged in successfully',
          user,
          token
     })
}

export default loginController