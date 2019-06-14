// import firebase from 'firebase/app';
import 'firebase/auth';
import 'bootstrap';
import usersData from '../../helpers/data/usersData';
import util from '../../helpers/util';
// jQuery
import $ from '../../../../node_modules/jquery';

// modal
const userModal = (users) => {
  const divString1 = '';
  const divString2 = '';
  const domString = `
  <div class="container">
    <form class="col">
      <label for="username-input">Create Username</label>
      <input id="username-input"></input>
      <label for="defaultForm-email">Add Email</label>
      <input id="defaultForm-email"></input>
      <button id="submit-user-info" type="submit" class="btn btn-success">Sign Up!</button>
    </form>
  </div>`;
  util.printToDom('addNewCalendarEvent', divString2);
  util.printToDom('addNewDiaryPostFormDiv', divString1);
  util.printToDom('user-modal', domString);
  $('#pineModal').modal('toggle');
  document.getElementById('submit-user-info').addEventListener('click', (e) => {
    e.preventDefault();
    addNewUser(users); // eslint-disable-line no-use-before-define
    $('#pineModal').modal('toggle');
  });
};


// const getCurrentUid = () => firebase.auth().currentUser.uid;

const newUserValues = (users) => {
  const newUser = {
    userName: document.getElementById('username-input').value,
    email: document.getElementById('defaultForm-email').value,
    uid: users,
  };
  return newUser;
};


const addNewUser = (users) => {
  const newUserObject = newUserValues(users);
  const userInput = newUserObject.user;
  if (userInput !== '') {
    usersData.createNewUser(newUserObject).then().catch(error => console.error(error));
  }
};


// const events = () => {
//   document.getElementById('submit-user-info').addEventListener('click', addNewUser);
//   console.error('click-event');
// };

export default { addNewUser, userModal };
