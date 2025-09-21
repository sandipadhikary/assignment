import express from 'express'
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Routes API is working ✅')
})

export default router
