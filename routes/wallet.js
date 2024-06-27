const express = require('express');
const router = express.Router();

// Simulación de base de datos para billeteras
const wallets = {
  '1': { balance: 100.00 } // Usuario inicial con 100 de saldo
};

// Añadir fondos a la billetera
router.post('/:userId/add', (req, res) => {
  const { userId } = req.params;
  const { amount } = req.body;

  if (!wallets[userId]) {
    wallets[userId] = { balance: 0 };
  }

  wallets[userId].balance += amount;

  res.status(200).json({ message: 'Funds added', balance: wallets[userId].balance });
});

// Obtener balance de la billetera
router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  const wallet = wallets[userId] || { balance: 0 };
  res.status(200).json(wallet);
});

module.exports = router;
