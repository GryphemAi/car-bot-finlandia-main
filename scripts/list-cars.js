const axios = require('axios');
const { GoogleAuth } = require('google-auth-library');
const serviceAccount = require('../config/serviceAccountKey.json');

async function listCars() {
  try {
    // 1. Gerar token
    const auth = new GoogleAuth({
      credentials: serviceAccount,
      scopes: ['https://www.googleapis.com/auth/datastore']
    });
    const client = await auth.getClient();
    const token = await client.getAccessToken();

    // 2. Fazer requisição GET
    const projectId = serviceAccount.project_id;
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/cars`;

    console.log('\nBuscando carros...');
    console.log('URL:', url);

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token.token}`,
        'Content-Type': 'application/json'
      }
    });

    // 3. Processar e mostrar os resultados
    if (response.data && response.data.documents) {
      console.log('\nCarros encontrados:', response.data.documents.length);
      response.data.documents.forEach((doc, index) => {
        console.log(`\nCarro ${index + 1}:`);
        console.log('ID:', doc.name.split('/').pop());
        console.log('Nome:', doc.fields.nome?.stringValue);
        console.log('Preço:', doc.fields.preco?.stringValue);
        console.log('Placa:', doc.fields.placa?.stringValue);
      });
    } else {
      console.log(
        '\nNenhum carro encontrado ou formato de resposta inesperado'
      );
      console.log('Resposta completa:', JSON.stringify(response.data, null, 2));
    }
  } catch (error) {
    console.error('\nErro ao listar carros:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Dados:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(error);
    }
  }
}

listCars();
