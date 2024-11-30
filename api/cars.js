const Car = require('../database/models/Car');

async function saveCar(carData) {
  try {
    const car = await Car.create(carData);
    console.log('Carro salvo com sucesso:', car.id);
    return car;
  } catch (error) {
    console.error('Erro ao salvar carro:', error);
    throw error;
  }
}

async function getAllCars() {
  try {
    const cars = await Car.findAll();
    return cars;
  } catch (error) {
    console.error('Erro ao buscar carros:', error);
    throw error;
  }
}

module.exports = {
  saveCar,
  getAllCars
};
