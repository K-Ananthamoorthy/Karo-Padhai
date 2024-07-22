// firebase-config.js

const firebaseConfig = {
    apiKey: "AIzaSyDRUswR5Q1HlPz0jqQWa3eT8DEnilpcN10",
    authDomain: "karo-padhai.firebaseapp.com",
    projectId: "karo-padhai",
    storageBucket: "karo-padhai.appspot.com",
    messagingSenderId: "52313475711",
    appId: "1:52313475711:web:0ef384b635711ec2480d4a"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Get a reference to the Firebase Storage service
  const storage = firebase.storage();
  