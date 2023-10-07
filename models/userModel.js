import mongoose from "mongoose";
import validator from "validator";

//schema
const userSchema = new mongoose.Schema({
     name: {
          type: String,
          required: true
     },
     email: {
          type: String,
          required: true,
          unique: true,
          validate: validator.isEmail
     },
     password: {
          type: String,
          required: true
     },
     location: {
          type: String,
          default: 'India'
     }
}, {timestamps: true})

const User = mongoose.model('User', userSchema)

export default User