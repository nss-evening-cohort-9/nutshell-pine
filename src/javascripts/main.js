import firebase from 'firebase/app';
import '../styles/main.scss';

import authData from './helpers/data/authData';
import MyNavbar from './components/MyNavbar/myNavbar';
import dashboard from './components/Dashboard/dashboard';
import Auth from './components/Auth/auth';
import apiKeys from './helpers/apiKeys.json';

const init = () => {
  firebase.initializeApp(apiKeys.firebaseKeys);
  MyNavbar.navbarEvents();
  Auth.authPrint();
  authData.checkLoginStatus();
  dashboard.dashboardLayoutStringBuilder();
};

init();
