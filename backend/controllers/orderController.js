import Order from '../models/orderModel.js';

// Create new order
export const addOrderItems = async (req, res) => {
  try {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400).json({ message: 'No order items' });
      return;
    } else {
      const order = new Order({
        orderItems,
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();
      res.status(201).json(createdOrder);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get order by ID
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get logged in user orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      const newStatus = req.body.status || order.status;
      order.status = newStatus;
      if (newStatus === 'Delivered') {
        order.isDelivered = true;
        order.deliveredAt = Date.now();
      }
      if (newStatus === 'Paid') {
        order.isPaid = true;
        order.paidAt = Date.now();
      }
      if (req.body.cancelReason) {
        order.cancelReason = req.body.cancelReason;
      }
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// User: Cancel order
export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      if (order.user.toString() !== req.user._id.toString()) {
        res.status(401).json({ message: 'Not authorized to cancel this order' });
        return;
      }
      if (order.status === 'Cancelled' || order.status === 'Delivered' || order.isDelivered) {
        res.status(400).json({ message: 'Cannot cancel this order' });
        return;
      }
      order.status = 'Cancelled';
      if (req.body.cancelReason) {
        order.cancelReason = req.body.cancelReason;
      }
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
