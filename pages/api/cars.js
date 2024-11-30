import Car from '../../database/models/Car';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const carData = req.body;
      const car = await Car.create(carData);
      console.log('Carro salvo com sucesso:', car.id);
      return res.status(201).json(car);
    } catch (error) {
      console.error('Erro ao salvar carro:', error);
      return res.status(500).json({ error: 'Erro ao salvar o carro' });
    }
  } else if (req.method === 'GET') {
    try {
      const cars = await Car.findAll();
      return res.status(200).json(cars);
    } catch (error) {
      console.error('Erro ao buscar carros:', error);
      return res.status(500).json({ error: 'Erro ao buscar os carros' });
    }
  }

  return res.status(405).json({ error: 'Método não permitido' });
}
