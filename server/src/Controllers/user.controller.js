import User from '../DB/models/user.model.js'

// @desc     Create a new user
// @route    POST /users
// @access   Private
export const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body)
    const { password, ...userWithoutPassword } = user.toObject()

    // Invalidate the cache for all users so the new user appears on next fetch
    if (redisClient.isOpen) await redisClient.del('users:all')

    res.status(201).json({ message: 'User created', user: userWithoutPassword })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// @desc     Get all users
// @route    GET /users
// @access   Private
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password')
    res.status(200).json({ count: users.length, users })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// @desc     Get a single user by ID
// @route    GET /users/:id
// @access   Private
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password')

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.status(200).json({ user })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// @desc     Update a user by ID
// @route    PUT /users/:id
// @access   Private
export const updateUser = async (req, res) => {
  try {
    delete req.body.password

    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, //returnDocument: 'after'
      runValidators: true,
    }).select('-password')

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Invalidate the cache so the updated user appears on next fetch
    if (redisClient.isOpen) await redisClient.del('users:all')

    res.status(200).json({ message: 'User updated', user })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// @desc     Delete a user by ID
// @route    DELETE /users/:id
// @access   Private
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Invalidate cache
    if (redisClient.isOpen) await redisClient.del('users:all')

    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}
