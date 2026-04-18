import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

// Register
router.post('/register', async (req, res) => {
	try {
		const { name, email, password } = req.body

		// Check if user already exists
		const existingUser = await prisma.user.findUnique({
			where: { email }
		})
		if (existingUser) {
			return res.status(409).json({ error: 'Email already in use' })
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10)

		// Create the user
		const user = await prisma.user.create({
			data: { name, email, password: hashedPassword }
		})

		// Generate token
		const token = jwt.sign(
			{ userId: user.id, email: user.email },
			process.env.JWT_SECRET,
			{ expiresIn: '7d' }
		)

		res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } })
	} catch (error) {
		res.status(500).json({ error: 'Sometyhing went wrong' })
	}
})

// Login
router.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body

		// Find user
		const user = await prisma.user.findUnique({
			where: { email }
		})
		if (!user) {
			return res.status(401).json({ error: 'Invalid email or password' })
		}

		// Check password
		const validPassword = await bcrypt.compare(password, user.password)
		if (!validPassword) {
			return res.status(401).json({ error: 'Invalid email or password' })
		}

		// Generate token
		const token = jwt.sign(
			{ userId: user.id, email: user.email },
			process.env.JWT_SECRET,
			{ expiresIn: '7d' }
		)

		res.json({ token, user: { id: user.id, name: user.name, email: user.email } })
	} catch (error) {
		console.log('Login error:', error)
		res.status(500).json({ error: 'Something went wrong' })
	}
})

export default router
