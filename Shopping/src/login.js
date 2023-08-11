let logIn = document.querySelector('#login');
let signUp = document.querySelector('#signUp');
let googleSignIn = document.querySelector('#googleSignIn');

let emailField = document.querySelector('#emailIn')
let passwordField = document.querySelector('#passwordIn')

let emailFields = document.querySelector('#emailSignUp');
let passwordFields = document.querySelector('#passSignUp');
let fullNameField = document.querySelector('#fullName');


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";


const firebaseConfig = {
apiKey: "AIzaSyD0XTLwhcACI0nze0VwJQkL9vRBARz6C_Y",
authDomain: "addtocart-16238.firebaseapp.com",
projectId: "addtocart-16238",
storageBucket: "addtocart-16238.appspot.com",
messagingSenderId: "524748777371",
appId: "1:524748777371:web:21d35f5b8dc99b95f7e33e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const storage = getStorage(app);

signUp.addEventListener('click', function() {
  console.log('23');
  // const emailSignUp
  // const profilePic = document.querySelector('#profilePic').files[0];
  // const imagesRef = ref(storage, 'images/' + email);
  // let imageLink;
  // const lname = document.querySelector('#fname').value;
  // if ()
  const email = emailFields.value;
  const password = passwordFields.value;

  console.log(email);

  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(user, "Created Succesfully");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage, errorCode);
  });

});

logIn.addEventListener('click', function() {
  const email = emailFields.value;
  const password = passwordFields.value;

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
});

googleSignIn.addEventListener('click', function () {
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log(user, "Success");
    // IdP data available using getAdditionalUserInfo(result)
    // ...
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
})