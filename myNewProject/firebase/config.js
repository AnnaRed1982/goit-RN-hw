// Для роботи із firebase обовʼязково треба ініціалізувати проект
import { initializeApp } from "firebase/app";
// Функція для підключення авторизації в проект
import { getAuth } from "firebase/auth";
// Функція для підключення бази даних у проект
import { getFirestore } from "firebase/firestore";
// Функція для підключення сховища файлів в проект
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAz1DyeGS_Y_4OCNAExmy2X632scrDRaro",
  authDomain: "social-network-rn2.firebaseapp.com",
  projectId: "social-network-rn2",
  storageBucket: "social-network-rn2.appspot.com",
  messagingSenderId: "6407028630",
  appId: "1:6407028630:web:42a37b346a41787644a7b7",

  // apiKey: "AIzaSyCorYQ2OjT6iQN3b5IkyQT9PS8Weoak3QM",
  // authDomain: "social-network-rn.firebaseapp.com",
  // projectId: "social-network-rn",
  // storageBucket: "social-network-rn.appspot.com",
  // messagingSenderId: "977248209365",
  // appId: "1:977248209365:web:7a85a902325efcf239155c",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// export default firebase;
