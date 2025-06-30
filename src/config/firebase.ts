import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

// Your Firebase configuration from environment variables
// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_FIREBASE_APP_ID
// }
// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB9zIBWlv8ZqQFvDZO217GifFGbVGcHAss",
  authDomain: "aasha-6f0bc.firebaseapp.com",
  projectId: "aasha-6f0bc",
  storageBucket: "aasha-6f0bc.firebasestorage.app",
  messagingSenderId: "789019124118",
  appId: "1:789019124118:web:a77b51663f697d79ba7db7",
  measurementId: "G-RKW4933RN8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

console.log('Firebase initialized with config:', {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain
})

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app)

console.log('Firebase Auth and Firestore initialized')

// Connect to emulators in development
if (process.env.NODE_ENV === 'development') {
  // Uncomment these lines when you want to use Firebase emulators
  // connectAuthEmulator(auth, 'http://localhost:9099')
  // connectFirestoreEmulator(db, 'localhost', 8080)
}

export default app 