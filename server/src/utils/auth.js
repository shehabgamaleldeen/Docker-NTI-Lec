import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10)
}

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword)
}

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET || 'access_secret', {
    expiresIn: '1h',
  })
}

export const generateRefreshToken = (payload) => {
  return jwt.sign(
    payload,
    process.env.REFRESH_TOKEN_SECRET || 'refresh_secret',
    {
      expiresIn: '7d',
    },
  )
}
