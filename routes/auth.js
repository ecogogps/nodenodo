const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Simulación de base de datos
const users = [
  { email: 'ecogogps@gmail.com', password: '123' }
];

// Registro
router.post('/register', (req, res) => {
  const { email, password } = req.body;
  users.push({ email, password });
  res.status(201).json({ message: 'User registered successfully' });
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.status(200).json({ message: 'Login successful' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// Recuperación de clave
router.post('/recover', (req, res) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email);
  if (user) {
    const tempPassword = Math.random().toString(36).slice(-8);
    user.password = tempPassword;
    
    // Configuración del transporte de correo
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '360startupec@gmail.com',
        pass: 'tpsh hykd plcf mtsf',
      },
    });

    const mailOptions = {
      from: 'your-email@gmail.com',
      to: user.email,
      subject: 'Recuperación de clave',
      text: `Tu nueva clave temporal es: ${tempPassword}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ message: 'Error sending email' });
      }
      res.status(200).json({ message: 'Email sent' });
    });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

module.exports = router;
