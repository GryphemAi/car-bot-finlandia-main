const admin = require('firebase-admin');
const db = admin.firestore();

// Função para transformar dados do bot para o formato do Firestore
function transformBotData(botData) {
  return {
    fields: {
      nome: { stringValue: botData.nome || '' },
      carID: { stringValue: botData.ID?.toString() || '' },
      placa: { stringValue: botData.placa || '' },
      vendedor: { stringValue: botData.vendedor || '' },
      preco: { stringValue: botData.preco?.toString() || '0' },
      data: { stringValue: botData.data || new Date().toISOString() },
      condicao: { stringValue: botData.condicao || '' },
      contato: { stringValue: botData.contato || '' },
      quilometragem: { stringValue: botData.quilometragem?.toString() || '' },
      ano: { stringValue: botData.ano?.toString() || '' },
      motor: { stringValue: botData.motor || '' },
      cambio: { stringValue: botData.cambio || '' },
      proprietarios: { stringValue: botData.proprietarios || '' },
      inspecionado: { booleanValue: botData.inspecionado || false },
      sistema_transmissao: { stringValue: botData.sistema_transmissao || '' },
      especificacoes: { stringValue: botData.especificacoes || '' },
      seguranca: { stringValue: botData.seguranca || '' },
      interior_comodidades: { stringValue: botData.interior_comodidades || '' },
      eletronica: { stringValue: botData.eletronica || '' },
      informacoes_adicionais: {
        stringValue: botData.informacoes_adicionais || ''
      },
      outros: { stringValue: botData.outros || '' },
      imagem: { stringValue: botData.imagem || '' },
      url: { stringValue: botData.url || '' },
      createdAt: { timestampValue: new Date().toISOString() },
      updatedAt: { timestampValue: new Date().toISOString() },
      loteId: { stringValue: new Date().toISOString().split('T')[0] }
    }
  };
}

// Função para salvar um lote de carros e excluir os antigos
async function saveBatchCars(carsData) {
  if (!Array.isArray(carsData) || carsData.length === 0) {
    throw new Error(
      'Dados inválidos: é necessário fornecer um array de carros'
    );
  }

  const batch = db.batch();
  const loteId = new Date().toISOString().split('T')[0];

  try {
    // 1. Primeiro, excluir todos os carros antigos
    const snapshot = await db.collection('cars').get();
    const deletePromises = [];

    snapshot.forEach((doc) => {
      deletePromises.push(doc.ref.delete());
    });

    await Promise.all(deletePromises);
    console.log('Carros antigos excluídos com sucesso');

    // 2. Inserir os novos carros
    const transformedCars = carsData.map((car) => transformBotData(car));

    for (const car of transformedCars) {
      const docRef = db.collection('cars').doc(); // Gera ID automático
      batch.set(docRef, car);
    }

    // 3. Commit do batch
    await batch.commit();
    console.log(
      `${transformedCars.length} carros salvos com sucesso no lote ${loteId}`
    );

    return {
      success: true,
      message: `${transformedCars.length} carros salvos com sucesso`,
      loteId
    };
  } catch (error) {
    console.error('Erro ao salvar lote de carros:', error);
    throw new Error(`Erro ao salvar lote de carros: ${error.message}`);
  }
}

// Função para buscar todos os carros
async function getAllCars() {
  try {
    const snapshot = await db
      .collection('cars')
      .orderBy('createdAt', 'desc')
      .get();
    const cars = [];

    snapshot.forEach((doc) => {
      cars.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return cars;
  } catch (error) {
    console.error('Erro ao buscar carros:', error);
    throw new Error(`Erro ao buscar carros: ${error.message}`);
  }
}

// Função para buscar carros por lote
async function getCarsByLote(loteId) {
  try {
    const snapshot = await db
      .collection('cars')
      .where('loteId', '==', loteId)
      .get();

    const cars = [];
    snapshot.forEach((doc) => {
      cars.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return cars;
  } catch (error) {
    console.error('Erro ao buscar carros do lote:', error);
    throw new Error(`Erro ao buscar carros do lote: ${error.message}`);
  }
}

module.exports = {
  saveBatchCars,
  getAllCars,
  getCarsByLote
};
