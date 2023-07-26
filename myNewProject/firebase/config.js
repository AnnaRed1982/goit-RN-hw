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
  apiKey: "AIzaSyBmclIX-XLc335e5C9TMoCIBrYFk2TCajo",
  authDomain: "rn-socialnetwork--3.firebaseapp.com",
  projectId: "rn-socialnetwork--3",
  storageBucket: "rn-socialnetwork--3.appspot.com",
  messagingSenderId: "260516306731",
  appId: "1:260516306731:web:1ba524e04ba5b1752f6f6e",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// export default firebase;
