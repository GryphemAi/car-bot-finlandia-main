const Car = require('../database/models/Car');

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
    // Inicia uma transação para garantir que todas as operações sejam feitas ou nenhuma
    await Car.sequelize.transaction(async (transaction) => {
      // 1. Limpa todos os registros existentes
      await Car.destroy({
        truncate: true,
        cascade: true,
        transaction
      });
      console.log('Banco de dados limpo com sucesso');

      // 2. Transforma todos os dados do bot
      const transformedCars = carsData.map((car) => transformBotData(car));

      // 3. Insere todos os novos registros
      const cars = await Car.bulkCreate(transformedCars, { transaction });
      console.log(`${cars.length} carros salvos com sucesso`);
      return cars;
    });
  } catch (error) {
    console.error('Erro ao atualizar lote de carros:', error);
    throw error;
  }
}

// Função para salvar um único carro (mantida para compatibilidade)
async function saveCar(carData) {
  try {
    const transformedData = transformBotData(carData);
    const car = await Car.create(transformedData);
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
  saveBatchCars,
  getAllCars
};
