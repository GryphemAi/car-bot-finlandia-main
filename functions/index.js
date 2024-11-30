const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.batchUpdateCars = functions.https.onRequest(async (req, res) => {
  // Habilita CORS
  res.set('Access-Control-Allow-Origin', '*');

  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  try {
    const db = admin.firestore();
    const batch = db.batch();

    // 1. Deleta todos os documentos existentes
    const snapshot = await db.collection('cars').get();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    // 2. Adiciona os novos documentos
    const cars = req.body;
    if (!Array.isArray(cars)) {
      res.status(400).send('O body deve ser um array de carros');
      return;
    }

    cars.forEach((car) => {
      const docRef = db.collection('cars').doc();
      batch.set(docRef, car);
    });

    // 3. Executa todas as operações em uma única transação
    await batch.commit();

    res.status(200).json({
      message: 'Carros atualizados com sucesso',
      totalCarros: cars.length
    });
  } catch (error) {
    console.error('Erro ao atualizar carros:', error);
    res.status(500).json({
      error: 'Erro ao processar a requisição',
      details: error.message
    });
  }
});
