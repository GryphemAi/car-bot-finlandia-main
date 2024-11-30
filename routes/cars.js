const express = require('express');
const router = express.Router();
const { saveCar, getAllCars } = require('../api/cars');

// Rota para receber dados do bot e salvar no banco
router.post('/cars', async (req, res) => {
  try {
    const carData = req.body;
    console.log('Dados recebidos:', carData);
    const savedCar = await saveCar(carData);
    res.status(201).json(savedCar);
  } catch (error) {
    console.error(
      'Erro detalhado na rota POST /cars:',
      error.message,
      error.stack
    );
    res
      .status(500)
      .json({ error: 'Erro ao salvar o carro', details: error.message });
  }
});

// Rota para listar todos os carros
router.get('/cars', async (req, res) => {
  try {
    const cars = await getAllCars();
    res.json(cars);
  } catch (error) {
    console.error('Erro na rota GET /cars:', error);
    res.status(500).json({ error: 'Erro ao buscar os carros' });
  }
});

module.exports = router;
