import User from '../DB/models/user.model.js'
import { faker } from '@faker-js/faker'
import bcrypt from 'bcrypt'
import { hashPassword } from '../utils/auth.js'

export const seedUsers = async (req, res) => {
  try {
    const count = 5000

    const users = []

    const defaultPassword = 'pass123456'

    const hashedPasswword = await bcrypt.hash(defaultPassword, 10)

    for (let i = 0; i < count; i++) {
      const uniqueEmail = `user${i}_${Date.now()}@${faker.internet.domainName()}`
      users.push({
        name: faker.person.fullName(),
        email: uniqueEmail,
        password: hashedPasswword,
        role: 'user',
      })
    }

    console.log(users)

    const batch_size = 1000

    for (let i = 0; i < users.length; i += batch_size) {
      const batch = users.slice(i, i + batch_size)
      await User.collection.insertMany(batch)
    }

    return res.status(201).json({
      message: 'successfully seeded',
      count,
    })
  } catch (error) {
    console.log(error)

    res.status(500).json({
      message: 'serverkkkkkkkkk',
      count,
    })
  }
}
