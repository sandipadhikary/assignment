import Order from '../models/Order.js'

export const getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find()
    res.json(orders)
  } catch (err) {
    next(err)
  }
}

export const createOrder = async (req, res, next) => {
  try {
    const newOrder = new Order(req.body)
    const savedOrder = await newOrder.save()
    res.status(201).json(savedOrder)
  } catch (err) {
    next(err)
  }
}

export const updateOrder = async (req, res, next) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!updatedOrder) return res.status(404).json({ message: 'Order not found' })
    res.json(updatedOrder)
  } catch (err) {
    next(err)
  }
}

export const deleteOrder = async (req, res, next) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.id)
    if (!deletedOrder) return res.status(404).json({ message: 'Order not found' })
    res.json({ message: 'Order deleted successfully' })
  } catch (err) {
    next(err)
  }
}
