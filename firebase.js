import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCd0G6AFBNXCVri3rQMKI09WYhuI3dLkCQ",
  authDomain: "mood-e169b.firebaseapp.com",
  databaseURL:
    "https://mood-e169b-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "mood-e169b",
  storageBucket: "mood-e169b.appspot.com",
  messagingSenderId: "582505707015",
  appId: "1:582505707015:web:94abc1ba81ca5260221ca2",
  measurementId: "G-M021LDGZ02",
};

const app = initializeApp(firebaseConfig);

export default app;
