import express from "express"
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from "./config/db.js"
import cors from 'cors'
import morgan from "morgan"
import bodyParser from "body-parser"
import 'express-async-errors'

//route imports
import testRoutes from './routes/testRoutes.js'
import authRoutes from './routes/authRoutes.js'
import errorMiddleware from "./middlewares/errorMiddleware.js"
import userRoutes from './routes/userRoutes.js'

//config dotenv
dotenv.config()

//mongoDB connection
connectDB()

//rest obj
const app = express()

//middleware
app.use(express.json());
app.use(cors())
app.use(morgan('dev'))
// app.use(bodyParser.json())

//route
app.use('/api/v1/test', testRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/user', userRoutes)

//validation middleware
app.use(errorMiddleware)

//port
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
     console.log(`Server running in ${PORT}, in ${process.env.DEV_MODE}`
     .bgYellow.white
     )
})