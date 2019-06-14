import firebase from 'firebase/app';
import 'firebase/auth';

import diary from '../../components/Diary/diary';
import messages from '../../components/Messages/messages';
import events from '../../components/Events/events';
import news from '../../components/News/news';

import dashboardEvents from '../../components/Dashboard/dashboard';

const authDiv = document.getElementById('auth');
const layoutDiv = document.getElementById('layout');
const nutshellNavbar = document.getElementById('navbar-button-nutshell');
const authNavbar = document.getElementById('navbar-button-auth');
const logoutNavbar = document.getElementById('navbar-button-logout');
const footer = document.getElementById('footer');

const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      authDiv.classList.add('hide');
      layoutDiv.classList.add('show');
      nutshellNavbar.classList.remove('hide');
      authNavbar.classList.add('hide');
      logoutNavbar.classList.remove('hide');
      footer.classList.remove('hide');
      diary.diaryDomStringBuilder();
      messages.messagesStringBuilder();
      messages.displayMsgInput();
      messages.initMessages();
      events.initEventsForPageLoad(user.uid);
      news.initNews(user.uid);
      dashboardEvents.dashboardAddEventListeners();
    } else {
      authDiv.classList.remove('hide');
      layoutDiv.classList.remove('show');
      nutshellNavbar.classList.add('hide');
      authNavbar.classList.remove('hide');
      logoutNavbar.classList.add('hide');
      footer.classList.add('hide');
    }
  });
};

export default { checkLoginStatus };
