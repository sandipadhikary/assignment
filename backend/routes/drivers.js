import express from 'express'
const router = express.Router()

router.get('/', (req, res) => res.send('Drivers route working ✅'))

export default router
