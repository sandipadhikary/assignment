import Route from '../models/Route.js'

export const getRoutes = async (req, res, next) => {
  try {
    const routes = await Route.find()
    res.json(routes)
  } catch (err) {
    next(err)
  }
}

export const createRoute = async (req, res, next) => {
  try {
    const newRoute = new Route(req.body)
    const savedRoute = await newRoute.save()
    res.status(201).json(savedRoute)
  } catch (err) {
    next(err)
  }
}

export const updateRoute = async (req, res, next) => {
  try {
    const updatedRoute = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedRoute) return res.status(404).json({ message: 'Route not found' })
    res.json(updatedRoute)
  } catch (err) {
    next(err)
  }
}

export const deleteRoute = async (req, res, next) => {
  try {
    const deletedRoute = await Route.findByIdAndDelete(req.params.id)
    if (!deletedRoute) return res.status(404).json({ message: 'Route not found' })
    res.json({ message: 'Route deleted successfully' })
  } catch (err) {
    next(err)
  }
}
