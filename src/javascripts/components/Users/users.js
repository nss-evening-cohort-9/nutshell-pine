// import firebase from 'firebase/app';
import 'firebase/auth';
import 'bootstrap';
import usersData from '../../helpers/data/usersData';


const newUserValues = () => {
  const newUser = {
    userName: document.getElementById('username-input').value,
    message: document.getElementById('defaultForm-email').value,
  };
  return newUser;
};

const addNewUser = () => {
  const newUserObject = newUserValues();
  const userInput = newUserObject.user;
  if (userInput !== '') {
    usersData.createNewUser(newUserObject)
      .then(() => {
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

// const enterUserSubmit = () => {
//   $('#new-user-modal').on('keyup', (e) => {
//     if (e.keyCode === 13) {
//       $('#submit-user-info').trigger('click');
//     }
//   });
// };

const events = () => {
  document.getElementById('submit-user-info').addEventListener('click', addNewUser);
  console.error('click-event');
};

export default { events };
