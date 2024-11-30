const carService = require('../services/carService');

// Função para transformar o JSON do bot finlandês para nosso formato
function transformBotData(botData) {
  return {
    nome: botData.nome || '',
    carId: botData.ID || '',
    placa: botData.placa || '',
    vendedor: botData.vendedor || '',
    preco: parseFloat(botData.preco) || 0,
    data: botData.data || new Date().toISOString(),
    condicao: botData.condicao || '',
    contato: botData.contato || '',
    quilometragem: botData.quilometragem?.toString() || '',
    ano: botData.ano?.toString() || '',
    motor: botData.motor || '',
    cambio: botData.cambio || '',
    proprietarios: botData.proprietarios || '',
    inspecionado: botData.inspecionado || false,
    sistema_de_transmissao: botData.sistema_de_transmissao || '',
    especificacoes: botData.especificacoes || '',
    seguranca: botData.seguranca || '',
    interior_comodidades: botData.interior_comodidades || '',
    eletronica: botData.eletronica || '',
    informacoes_adicionais: botData.informacoes_adicionais || '',
    outros: botData.outros || '',
    imagem: botData.imagem || ''
  };
}

// Função para salvar um lote de carros (substitui todos os existentes)
async function saveBatchCars(carsData) {
  try {
    const transformedCars = carsData.map((car) => transformBotData(car));
    const result = await carService.saveBatchCars(transformedCars);
    return result;
  } catch (error) {
    console.error('Erro ao atualizar lote de carros:', error);
    throw error;
  }
}

// Função para salvar um único carro (mantida para compatibilidade)
async function saveCar(carData) {
  try {
    const transformedData = transformBotData(carData);
    const result = await carService.saveCar(transformedData);
    return result;
  } catch (error) {
    console.error('Erro ao salvar carro:', error);
    throw error;
  }
}

async function getAllCars() {
  try {
    const cars = await carService.getAllCars();
    return cars;
  } catch (error) {
    console.error('Erro ao buscar carros:', error);
    throw error;
  }
}

async function getCarsByLote(loteId) {
  try {
    const cars = await carService.getCarsByLote(loteId);
    return cars;
  } catch (error) {
    console.error('Erro ao buscar carros do lote:', error);
    throw error;
  }
}

module.exports = {
  saveCar,
  saveBatchCars,
  getAllCars,
  getCarsByLote
};
