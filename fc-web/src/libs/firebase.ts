import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY ?? "",
  authDomain: "fake-check-web.firebaseapp.com",
  databaseURL: "https://fake-check-web.firebaseio.com",
  projectId: "fake-check-web",
  storageBucket: "fake-check-web.appspot.com",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSENGER_SENDER_ID ?? "",
  appId: process.env.REACT_APP_FIREBASE_APP_ID ?? "",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID ?? "",
};
firebase.initializeApp(firebaseConfig);

export default firebase;
