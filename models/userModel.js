import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
import JWT from 'jsonwebtoken'

//schema
const userSchema = new mongoose.Schema({
     name: {
          type: String,
          required: [true, 'Please prvide name']
     },
     email: {
          type: String,
          required: [true, 'Please provide mail'],
          unique: true,
          validate: validator.isEmail
     },
     password: {
          type: String,
          required: [true, 'Please provide password'],
          minlength: [6, 'Greater than 6 characters']
     },
     location: {
          type: String,
          default: 'India'
     }
}, {timestamps: true})

//middlewares
userSchema.pre('save', async function(){
     const salt = await bcrypt.genSalt(10)
     this.password = await bcrypt.hash(this.password, salt)
})

//compare password
userSchema.methods.comparePassword = async function(userPassword){
     const isMatch = await bcrypt.compare(userPassword, this.password)
     return isMatch;
}

//jwt
userSchema.methods.createJWT = function(){
     return JWT.sign({userId: this._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
}

const User = mongoose.model('User', userSchema)

export default User