import firebase from 'firebase/app';
import 'firebase/auth';

import diary from '../../components/Diary/diary';
import messages from '../../components/Messages/messages';
import events from '../../components/Events/events';
import users from '../../components/Users/users';
import usersData from './usersData';
import news from '../../components/News/news';
import dashboardEvents from '../../components/Dashboard/dashboard';
import userNav from '../../components/Diary/userNav';

const authDiv = document.getElementById('auth');
const layoutDiv = document.getElementById('layout');
const nutshellNavbar = document.getElementById('navbar-button-nutshell');
const usernameNavbar = document.getElementById('navbar-button-username');
const authNavbar = document.getElementById('navbar-button-auth');
const logoutNavbar = document.getElementById('navbar-button-logout');
const footer = document.getElementById('footer');


const checkLoginStatus = () => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      usersData.getUsers()
        .then((allUsers) => {
          const filterUids = allUsers.filter(id => id.uid === user.uid);
          allUsers.forEach((u) => {
            if (u.uid === user.uid) {
              userNav.showUserNameInNavBar(u.userName);
              console.error(u.userName);
            }
          });
          if (filterUids.length === 0) {
            users.userModal(user.uid);
          }
        }).catch(err => console.error('getting single user at authData', err));
      authDiv.classList.add('hide');
      layoutDiv.classList.add('show');
      nutshellNavbar.classList.remove('hide');
      usernameNavbar.classList.remove('hide');
      authNavbar.classList.add('hide');
      logoutNavbar.classList.remove('hide');
      footer.classList.remove('hide');
      diary.diaryDomStringBuilder(user.uid);
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
