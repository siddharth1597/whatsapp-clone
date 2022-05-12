import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider, getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "APIKEY",
  authDomain: "whatsapp....",
  projectId: "whatsapp....",
  storageBucket: "whatsapp....",
  messagingSenderId: "32....",
  appId: "1:32881...........0f23"
};

const firebaseApp = initializeApp(firebaseConfig);

const db = getFirestore(firebaseApp);

const auth = getAuth();

const provider = new GoogleAuthProvider();

export { auth, provider };
export default db;
