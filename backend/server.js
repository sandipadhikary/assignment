import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => res.send('Backend is running ✅'))

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected ✅')
    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`))
  } catch (err) {
    console.error('MongoDB connection error:', err.message)
    process.exit(1)
  }
}

startServer()
