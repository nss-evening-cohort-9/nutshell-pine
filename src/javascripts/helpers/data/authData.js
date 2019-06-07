import firebase from 'firebase/app';
import 'firebase/auth';
// components
import diary from '../../components/Diary/diary';

const authDiv = document.getElementById('auth');
const nutshellDiv = document.getElementById('nutshell');
const nutshellNavbar = document.getElementById('navbar-button-nutshell');
const authNavbar = document.getElementById('navbar-button-auth');
const logoutNavbar = document.getElementById('navbar-button-logout');
const diaryDiv = document.getElementById('diaryComponentDiv');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authDiv.classList.add('hide');
      nutshellDiv.classList.remove('hide');
      nutshellNavbar.classList.remove('hide');
      authNavbar.classList.add('hide');
      logoutNavbar.classList.remove('hide');
      diaryDiv.classList.remove('hide');
      diary.diaryDomStringBuilder();
    } else {
      authDiv.classList.remove('hide');
      nutshellDiv.classList.add('hide');
      nutshellNavbar.classList.add('hide');
      authNavbar.classList.remove('hide');
      logoutNavbar.classList.add('hide');
      diaryDiv.classList.add('hide');
    }
  });
};

export default { checkLoginStatus };
