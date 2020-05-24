import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAFhj1EAZ5JhOSS8juxWXA5lC6AJIe7uF8",
    authDomain: "water-database-83eb6.firebaseapp.com",
    databaseURL: "https://water-database-83eb6.firebaseio.com",
    projectId: "water-database-83eb6",
    storageBucket: "water-database-83eb6.appspot.com",
    messagingSenderId: "283478588136",
    appId: "1:283478588136:web:f9e9522089735a477c275d",
    measurementId: "G-WT1SP7EZRF"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

export default firebase;