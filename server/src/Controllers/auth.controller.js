import User from '../DB/models/user.model.js'
import {
  hashPassword,
  comparePassword,
  generateAccessToken,
  generateRefreshToken,
} from '../utils/auth.js'
import { createConflictError, createUnauthorizedError } from '../utils/error.js'
import jwt from 'jsonwebtoken'

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    const existUser = await User.findOne({ email })
    if (existUser) {
      throw createConflictError('email is exist')
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || 'user',
    })

    const userObj = user.toObject()
    delete userObj.password

    res.status(201).json({
      message: 'User registered successfully',
      user: userObj,
    })
  } catch (error) {
    res.status(error.statusCode || 500).json({
      message: error.message || 'Server error',
    })
  }
}
