import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyA6lai1ohUwXmmmq4E0Hdm65-Wj3MOgl1A",
  authDomain: "shareleh-6979d.firebaseapp.com",
  projectId: "shareleh-6979d",
  storageBucket: "shareleh-6979d.appspot.com",
  messagingSenderId: "372352701806",
  appId: "1:372352701806:web:f0d6fda8bf214b23101d7f",
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);

export default firebase;
