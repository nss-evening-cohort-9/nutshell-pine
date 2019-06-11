import firebase from 'firebase/app';
import 'firebase/auth';

const createNewUser = () => {
  const newUser = {
    userName: document.getElementById('usernName').value,
    message: document.getElementById('email').value,
    uid: firebase.auth().currentUser.uid,
  };
  return newUser;
};

const signUp = () => {
 var email = document.getElementById('email').value;
 var password = document.getElementById('password').value;
 if (email.length < 4) {
   alert('Please enter an email address.');
   return;
 }
 if (password.length < 4) {
   alert('Please enter a password.');
   return;
 }
 // Sign in with email and pass.
 firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
   // Handle Errors here.
   var errorCode = error.code;
   var errorMessage = error.message;
   // [START_EXCLUDE]
   if (errorCode == 'auth/weak-password') {
     alert('The password is too weak.');
   } else {
     alert(errorMessage);
   }
   console.log(error);
   // [END_EXCLUDE]
 });
 // [END createwithemail]
}

// get user data
const authenticatedUser = () => {
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    const userName = user.userName;
    const email = user.email;
    const emailVerified = user.emailVerified;
    const isAnonymous = user.isAnonymous;
    const uid = user.uid;
    // ...
  } else {
    // User is signed out.
    // ...
  };