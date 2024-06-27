const express = require('express');
const router = express.Router();

// Simulación de base de datos
const products = [
  { id: 1, name: 'Tomate', category: 'Supermercado', attributes: ['attr1', 'attr2'], price: 1.00 },
  { id: 2, name: 'TV', category: 'Tecnología', attributes: ['attr1', 'attr2'], price: 100.00 },
];

// Obtener todos los productos
router.get('/products', (req, res) => {
  res.status(200).json(products);
});

// Agregar un nuevo producto
router.post('/products', (req, res) => {
  const { name, category, attributes } = req.body;
  const newProduct = {
    id: products.length + 1,
    name,
    category,
    attributes,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

module.exports = router;
