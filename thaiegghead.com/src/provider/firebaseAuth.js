import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyAXztE2lnsh-_1N4HCnHgLkVLdP85wavkM",
    authDomain: "thaiegghead.firebaseapp.com",
    projectId: "thaiegghead",
    storageBucket: "thaiegghead.appspot.com",
    messagingSenderId: "1051873838017",
    appId: "1:1051873838017:web:192f6608befc02033da540"
};

// Initialize Firebase
let instance;

export default function getFirebase() {
  if (typeof window !== "undefined") {
    if (instance) return instance;
    instance = firebase.initializeApp(firebaseConfig);
    return instance;
  }

  return null;
}