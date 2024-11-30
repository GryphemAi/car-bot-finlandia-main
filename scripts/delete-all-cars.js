const axios = require('axios');
const { GoogleAuth } = require('google-auth-library');
const serviceAccount = require('../config/serviceAccountKey.json');

async function deleteAllCars() {
  try {
    // 1. Gerar token
    const auth = new GoogleAuth({
      credentials: serviceAccount,
      scopes: ['https://www.googleapis.com/auth/datastore']
    });
    const client = await auth.getClient();
    const token = await client.getAccessToken();

    // 2. Primeiro, listar todos os carros
    const projectId = serviceAccount.project_id;
    const baseUrl = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/cars`;

    console.log('\nBuscando carros para deletar...');
    const listResponse = await axios.get(baseUrl, {
      headers: {
        Authorization: `Bearer ${token.token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!listResponse.data.documents) {
      console.log('Nenhum carro encontrado para deletar.');
      return;
    }

    // 3. Deletar cada carro
    console.log(`\nDeletando ${listResponse.data.documents.length} carros...`);

    for (const doc of listResponse.data.documents) {
      const docId = doc.name;
      console.log(`Deletando: ${docId}`);

      await axios.delete(docId, {
        headers: {
          Authorization: `Bearer ${token.token}`,
          'Content-Type': 'application/json'
        }
      });
    }

    console.log('\nTodos os carros foram deletados com sucesso!');
  } catch (error) {
    console.error('\nErro ao deletar carros:');
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Dados:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error(error);
    }
  }
}

deleteAllCars();
