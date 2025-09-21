import Driver from '../models/Driver.js'
import Order from '../models/Order.js'
import Route from '../models/Route.js'

const parseTime = (timeStr) => {
  const [h, m] = timeStr.split(':').map(Number)
  return h * 60 + m
}

export const runSimulation = async (req, res, next) => {
  try {
    const { numDrivers, startTime, maxHoursPerDriver } = req.body
    if (!numDrivers || !startTime || !maxHoursPerDriver) return res.status(400).json({ message: 'Missing input' })
    const drivers = await Driver.find().limit(numDrivers)
    const orders = await Order.find()
    const routes = await Route.find()
    let totalProfit = 0, onTime = 0, late = 0

    orders.forEach(order => {
      const route = routes.find(r => r.route_id === order.route_id)
      if (!route) return
      let deliveryMinutes = parseTime(order.delivery_time)
      let baseMinutes = route.base_time_min
      let fuelCost = route.distance_km * 5
      if (route.traffic_level === 'High') fuelCost += route.distance_km * 2
      let penalty = deliveryMinutes > baseMinutes + 10 ? 50 : 0
      let bonus = order.value_rs > 1000 && deliveryMinutes <= baseMinutes + 10 ? order.value_rs * 0.1 : 0
      if (deliveryMinutes <= baseMinutes + 10) onTime++
      else late++
      totalProfit += order.value_rs + bonus - penalty - fuelCost
    })

    const efficiency = Math.round((onTime / (onTime + late)) * 100)
    res.json({ totalProfit, efficiency, onTime, late })
  } catch (err) {
    next(err)
  }
}

export const getHistory = async (req, res, next) => {
  res.json({ message: 'Simulation history endpoint - implement DB storage if needed' })
}
