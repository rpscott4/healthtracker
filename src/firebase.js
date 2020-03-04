import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

const config = {
  apiKey: "AIzaSyCWMENQuG6sZzwbOHJ6kjU0r7tOdq2rkd8",
  authDomain: "healthtracker-8243e.firebaseapp.com",
  databaseURL: "https://healthtracker-8243e.firebaseio.com",
  projectId: "healthtracker-8243e",
  storageBucket: "healthtracker-8243e.appspot.com",
  messagingSenderId: "389501406882",
  appId: "1:389501406882:web:99e1cb7fa3d8865729d1fb"
};

firebase.initializeApp(config);

export const auth = firebase.auth();

export const db = firebase.firestore();

export const functions = firebase.functions();
