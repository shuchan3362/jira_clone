import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// firebase.initializeApp({
//   apiKey: "AIzaSyAenFKBhBtb3s2owwE7ZXmn-Cf88tPYoI8",
//   authDomain: "jira-clone-4e8c1.firebaseapp.com",
//   projectId: "jira-clone-4e8c1",
// });

firebase.initializeApp(firebaseConfig);
export default firebase;
export const db = firebase.firestore();
