import firebase from 'firebase/app';
import 'firebase/auth';

import diary from '../../components/Diary/diary';
import messages from '../../components/Messages/messages';
import events from '../../components/Events/events';
import users from '../../components/Users/users';
import usersData from './usersData';
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
      usersData.getUsers()
        .then((allUsers) => {
          const filterUids = allUsers.filter(id => id.uid === user.uid);
          if (filterUids.length === 0) {
            users.userModal(user.uid);
          }
          allUsers.forEach((u) => {
            if (user.uid === u.uid) {
              diary.diaryDomStringBuilder(u.userName);
              // userNameForDiary = u.userName; // need to get this info as param in diary call
            }
          });
        }).catch(err => console.error('getting single user at authData', err));
      authDiv.classList.add('hide');
      layoutDiv.classList.add('show');
      nutshellNavbar.classList.remove('hide');
      authNavbar.classList.add('hide');
      logoutNavbar.classList.remove('hide');
      footer.classList.remove('hide');
      messages.messagesStringBuilder();
      events.initEventsItemForDom(user.uid);
      messages.displayMsgInput();
      messages.initMessages();
      events.initEventsItemForDom(user.uid);
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
