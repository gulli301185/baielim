import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBx3tZFzKZCLjz8StOz1BYGSe5J18we2pY',
  authDomain: 'baielim.firebaseapp.com',
  projectId: 'baielim',
  storageBucket: 'baielim.appspot.com',
  messagingSenderId: '1048462455823',
  appId: '1:1048462455823:web:e6c27bde44348bc6025f7a',
  measurementId: 'G-J9MYMLK8Z1',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
