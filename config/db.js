import mongoose from "mongoose";

const connectDB = async() => {
     try{
          const conn = await mongoose.connect(process.env.MONGO_URL, {
               useNewUrlParser: true,
               useUnifiedTopology: true,
             })
          console.log(`Connected to MongoDB ${mongoose.connection.host}`.bgMagenta.white)
     }
     catch(err){
          console.log(`Error, ${err}`.bgRed.white)
     }
} 

export default connectDB;