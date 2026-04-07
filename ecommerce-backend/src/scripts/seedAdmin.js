import dotenv from 'dotenv'

import connectDB from '../config/db.js'
import User from '../models/User.js'

dotenv.config()

const seedAdmin = async () => {
  await connectDB()

  const email = process.env.ADMIN_EMAIL || 'admin@example.com'
  const existingAdmin = await User.findOne({ email })

  if (existingAdmin) {
    console.log(`Admin already exists: ${email}`)
    process.exit(0)
  }

  await User.create({
    name: process.env.ADMIN_NAME || 'Admin User',
    email,
    phone: process.env.ADMIN_PHONE || '9999999999',
    password: process.env.ADMIN_PASSWORD || 'Admin@12345',
    role: 'admin',
  })

  console.log(`Admin created: ${email}`)
  process.exit(0)
}

seedAdmin().catch((error) => {
  console.error('Failed to seed admin', error)
  process.exit(1)
})