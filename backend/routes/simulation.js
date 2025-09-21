import express from 'express'
import { runSimulation, getHistory } from '../controllers/simulationController.js'

const router = express.Router()

router.post('/run', runSimulation)
router.get('/history', getHistory)

export default router
