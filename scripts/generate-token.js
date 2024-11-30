const { GoogleAuth } = require('google-auth-library');
const path = require('path');

// Path to service account file
const serviceAccountPath = path.join(
  __dirname,
  '../config/serviceAccountKey.json'
);

async function generateAccessToken() {
  try {
    const auth = new GoogleAuth({
      keyFile: serviceAccountPath,
      scopes: ['https://www.googleapis.com/auth/datastore']
    });

    const client = await auth.getClient();
    const token = await client.getAccessToken();

    console.log('\nAccess Token:', token.token);

    // Load service account to get project ID
    const serviceAccount = require(serviceAccountPath);
    const projectId = serviceAccount.project_id;
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/cars`;

    console.log('\nFirestore REST API URL:', url);
    console.log('\nUse this token in your Authorization header as:');
    console.log(`Bearer ${token.token}`);
  } catch (error) {
    console.error('Error generating token:', error);
  }
}

generateAccessToken();
