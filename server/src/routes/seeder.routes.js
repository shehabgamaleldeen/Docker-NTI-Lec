import { Router } from 'express'
import { seedUsers } from '../seeder/user.seeder.js'

const router = Router()

router.post('/users', seedUsers)

export default router
