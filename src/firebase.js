import firebase from "firebase/compat/app";
import "firebase/compat/database";
const firebaseConfig = {
  apiKey: "AIzaSyCbKeYxS89NHtghWZOJESz90GdFo_8jLGI",
  authDomain: "studentmanagementapp-c9e68.firebaseapp.com",
  projectId: "studentmanagementapp-c9e68",
  storageBucket: "studentmanagementapp-c9e68.appspot.com",
  messagingSenderId: "237207006956",
  appId: "1:237207006956:web:316a949f0793bdcb52bfc9",
};

// Initialize Firebase
const firebaseDB = firebase.initializeApp(firebaseConfig);
const db=firebaseDB.database().ref()
export {db};
