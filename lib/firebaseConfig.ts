import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  // Cole aqui as credenciais que o Firebase te forneceu
  apiKey: 'AIzaSyBLiprG3RogKRNAFmGUPZa7Rqs4QRuUFbE',
  authDomain: 'sitedecarros-f6010.firebaseapp.com',
  projectId: 'sitedecarros-f6010',
  storageBucket: 'sitedecarros-f6010.firebasestorage.app',
  messagingSenderId: '178883617405',
  appId: '1:178883617405:web:e6297abfdac3f83ac24714',
  measurementId: 'G-037NFEG5VY'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only on client side
let analytics = null;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export { analytics };
