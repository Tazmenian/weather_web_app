// Import the functions you need from the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0_utxnjH5oIZayIXd6I2otjUvU1N1KCU",
  authDomain: "complete-weather-app-81b70.firebaseapp.com",
  databaseURL: "https://complete-weather-app-81b70-default-rtdb.firebaseio.com",
  projectId: "complete-weather-app-81b70",
  storageBucket: "complete-weather-app-81b70.appspot.com",
  messagingSenderId: "826618851730",
  appId: "1:826618851730:web:a69358b17ac9655baa514b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize the Realtime Database
const db = getDatabase();

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.form-signup').addEventListener('submit', submitForm);
});

function submitForm(e) {
  e.preventDefault();

  var name = getElementVal('name');
  var email = getElementVal('email');
  var password = getElementVal('password');

  const formDataRef = ref(db, 'form-signup'); // Reference to 'form-signup' node

  // Create user with email and password
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log(user);
      // Add user details to the database
      push(formDataRef, { name, email }); // Push data to the database
      console.log(name, email);
      alert("Successfully Registered");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage);
      alert(errorMessage);
    });
}

const getElementVal = (name) => {
  return document.getElementById(name).value;
}

// Your existing sign-in function remains unchanged
document.querySelector('.form-signin').addEventListener('submit', signIn);

function signIn(e) {
  e.preventDefault();

  const email = document.getElementById('email2').value;
  const password = document.getElementById('password2').value;

  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // Store user information in session storage
      sessionStorage.setItem('user', JSON.stringify(user));
      alert("Sign in successful!");
      // Redirect to home page
      window.location.href = "weather_app.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorMessage);
      alert(errorMessage);
    });
}

