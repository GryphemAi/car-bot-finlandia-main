const admin = require('firebase-admin');
const { GoogleAuth } = require('google-auth-library');

// Inicializa o Firebase Admin com as credenciais
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`
});

async function generateAccessToken() {
  try {
    const auth = new GoogleAuth({
      credentials: serviceAccount,
      scopes: ['https://www.googleapis.com/auth/datastore']
    });

    const client = await auth.getClient();
    const token = await client.getAccessToken();

    console.log('\n=== Token e Informações para o Insomnia ===\n');
    console.log('Token gerado:');
    console.log(token.token);

    console.log('\nHeaders necessários:');
    console.log('Content-Type: application/json');
    console.log(`Authorization: Bearer ${token.token}`);

    console.log('\nURL para usar no Insomnia:');
    console.log(
      `https://firestore.googleapis.com/v1/projects/${serviceAccount.project_id}/databases/(default)/documents/cars`
    );

    console.log('\nExemplo de body para enviar um carro:');
    console.log(`{
  "fields": {
    "nome": {
      "stringValue": "Toyota Z8R"
    },
    "ID": {
      "stringValue": "14732694"
    },
    "placa": {
      "stringValue": "ABC-123"
    },
    "vendedor": {
      "stringValue": "Dealer Name"
    },
    "preco": {
      "stringValue": "189000"
    }
  }
}`);
  } catch (error) {
    console.error('Erro ao gerar token:', error);
  }
}

// Executa a função
generateAccessToken();
