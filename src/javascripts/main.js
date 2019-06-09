import firebase from 'firebase/app';
import '../styles/main.scss';
// load in Bootstrap JS
import 'bootstrap';
// import 'jquery';

// import authData from './helpers/data/authData';
import MyNavbar from './components/MyNavbar/myNavbar';
import Auth from './components/Auth/auth';
import apiKeys from './helpers/apiKeys.json';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  MyNavbar.navbarEvents();
  Auth.authPrint();
  // authData.checkLoginStatus();
};

init();
