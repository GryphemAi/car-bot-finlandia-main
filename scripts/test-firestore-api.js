const axios = require('axios');
const { GoogleAuth } = require('google-auth-library');
const serviceAccount = require('../config/serviceAccountKey.json');

async function testFirestoreAPI() {
  try {
    // 1. Gerar token
    const auth = new GoogleAuth({
      credentials: serviceAccount,
      scopes: ['https://www.googleapis.com/auth/datastore']
    });
    const client = await auth.getClient();
    const token = await client.getAccessToken();

    // 2. Configurar dados de teste no formato correto da API REST
    const testData = {
      fields: {
        nome: { stringValue: 'Carro Teste' },
        carID: { stringValue: '123456' },
        placa: { stringValue: 'ABC-1234' },
        vendedor: { stringValue: 'Vendedor Teste' },
        preco: { stringValue: '50000' },
        loteId: { stringValue: new Date().toISOString().split('T')[0] },
        createdAt: { timestampValue: new Date().toISOString() },
        updatedAt: { timestampValue: new Date().toISOString() }
      }
    };

    // 3. Fazer requisição POST
    const projectId = serviceAccount.project_id;
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/cars`;

    console.log('\nTentando criar documento...');
    const response = await axios.post(url, testData, {
      headers: {
        Authorization: `Bearer ${token.token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('\nDocumento criado com sucesso!');
    console.log('Resposta:', JSON.stringify(response.data, null, 2));
  } catch (error) {
    console.error(
      '\nErro:',
      error.response ? error.response.data : error.message
    );
  }
}

testFirestoreAPI();
