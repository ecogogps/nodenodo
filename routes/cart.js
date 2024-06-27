const express = require('express');
const router = express.Router();

// Simulación de base de datos para carritos
const carts = {};

// Añadir producto al carrito
router.post('/:userId/add', (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;

  if (!carts[userId]) {
    carts[userId] = [];
  }

  const productInCart = carts[userId].find(item => item.productId === productId);

  if (productInCart) {
    productInCart.quantity += quantity;
  } else {
    carts[userId].push({ productId, quantity });
  }

  res.status(200).json({ message: 'Product added to cart', cart: carts[userId] });
});

// Eliminar producto del carrito
router.post('/:userId/remove', (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;

  if (!carts[userId]) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  carts[userId] = carts[userId].filter(item => item.productId !== productId);

  res.status(200).json({ message: 'Product removed from cart', cart: carts[userId] });
});

// Obtener carrito de usuario
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const cart = carts[userId] || [];
  res.status(200).json(cart);
});

module.exports = router;
