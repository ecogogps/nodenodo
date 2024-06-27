const express = require('express');
const router = express.Router();

// Simulación de base de datos para pedidos
const orders = [];

// Crear un nuevo pedido
router.post('/', (req, res) => {
  const { userId, cart, address } = req.body;
  const orderId = orders.length + 1;
  const newOrder = { orderId, userId, cart, address, status: 'pending' };
  orders.push(newOrder);
  res.status(201).json({ message: 'Order created', order: newOrder });
});

// Obtener todos los pedidos de un usuario
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const userOrders = orders.filter(order => order.userId === userId);
  res.status(200).json(userOrders);
});

// Actualizar el estado del pedido
router.put('/:orderId', (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const order = orders.find(order => order.orderId === parseInt(orderId));
  if (order) {
    order.status = status;
    res.status(200).json({ message: 'Order status updated', order });
  } else {
    res.status(404).json({ message: 'Order not found' });
  }
});

module.exports = router;
