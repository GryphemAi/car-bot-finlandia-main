const express = require('express');
const router = express.Router();
const { saveCar, getAllCars, saveBatchCars } = require('../api/cars');

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

// Rota para receber lote de carros do bot (substitui todos os existentes)
router.post('/cars/batch', async (req, res) => {
  try {
    const carsData = req.body;
    if (!Array.isArray(carsData)) {
      return res
        .status(400)
        .json({ error: 'O body deve ser um array de carros' });
    }
    console.log(`Recebido lote com ${carsData.length} carros`);
    const savedCars = await saveBatchCars(carsData);
    res.status(201).json({
      message: `${carsData.length} carros atualizados com sucesso`,
      count: carsData.length
    });
  } catch (error) {
    console.error('Erro na rota POST /cars/batch:', error);
    res
      .status(500)
      .json({ error: 'Erro ao salvar lote de carros', details: error.message });
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
