import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'

import userRoutes from './src/routes/user.routes.js'
import authRoutes from './src/routes/auth.routes.js'
import seederRoutes from './src/routes/seeder.routes.js'

import cors from 'cors'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('DB connected successfully')
  })
  .catch((err) => {
    console.error('DB connection error:', err)
  })

app.use('/users', userRoutes)
app.use('/auth', authRoutes)

app.use('/seed', seederRoutes)

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})
