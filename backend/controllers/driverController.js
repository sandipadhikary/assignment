import Driver from '../models/Driver.js'

export const getDrivers = async (req, res, next) => {
  try {
    const drivers = await Driver.find()
    res.json(drivers)
  } catch (err) {
    next(err)
  }
}

export const createDriver = async (req, res, next) => {
  try {
    const newDriver = new Driver(req.body)
    const savedDriver = await newDriver.save()
    res.status(201).json(savedDriver)
  } catch (err) {
    next(err)
  }
}

export const updateDriver = async (req, res, next) => {
  try {
    const updatedDriver = await Driver.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedDriver) return res.status(404).json({ message: 'Driver not found' })
    res.json(updatedDriver)
  } catch (err) {
    next(err)
  }
}

export const deleteDriver = async (req, res, next) => {
  try {
    const deletedDriver = await Driver.findByIdAndDelete(req.params.id)
    if (!deletedDriver) return res.status(404).json({ message: 'Driver not found' })
    res.json({ message: 'Driver deleted successfully' })
  } catch (err) {
    next(err)
  }
}
