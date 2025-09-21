import express from 'express'
import { getRoutes, createRoute, updateRoute, deleteRoute } from '../controllers/routeController.js'

const router = express.Router()

router.get('/', getRoutes)
router.post('/', createRoute)
router.put('/:id', updateRoute)
router.delete('/:id', deleteRoute)

export default router
