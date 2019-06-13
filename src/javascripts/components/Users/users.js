import firebase from 'firebase/app';
import 'firebase/auth';
import 'bootstrap';
import usersData from '../../helpers/data/usersData';

// Build the Modal if we have determined there is no Username for the existing User

const getCurrentUserName = () => firebase.auth().currentUser.displayName;
const getCurrentUid = () => firebase.auth().currentUser.uid;

// const getCurrentUid = () => firebase.auth().currentUser.uid;

const createNewUser = (user) => {
  const uid = getCurrentUid();
  usersData.getSingleUser(uid)
    .then((result) => {
      const userObject = Object.keys(result.data).length;
      if (userObject === 0) {
        const newUserObject = {
          userUid: user.uid,
          userName: getCurrentUserName(),
        };
        usersData.createSingleUser(newUserObject);
      }
    });
};


// const getUserValues = () => {
//   const userNameInput = document.getElementById('username-input');
//   const userNameEmail = document.getElementById('defaultForm-email');
//   const newUser = {
//     // uid: firebase.auth().currentUser.uid,
//     userName: userNameInput,
//     email: userNameEmail,
//   };
//   return newUser;
// };

// const addNewUser = () => {
//   const newUserObject = getUserValues();
//   const userInput = newUserObject.message;
//   if (userInput !== '') {
//     usersData.createNewUser(newUserObject)
//       .then(() => {
//         userModal();
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }
// };

// const getValueIput = (id) => {
//   return document.getElementById(id).value();
// };

// // values
// const userNameInput = getValueIput('username-input');
// const userNameEmail = getValueIput('defaultForm-email');

// const submitModal= (e) => {
//   e.preventDefault();
// };

// const saveMessages = ()
const events = () => {
  document.getElementById('modalLoginForm').addEventListener('click', createNewUser);
};
// const submitNewUserButton = userId => new Promise((resolve, reject) => {
//   const userNameInput = document.getElementById('username-input');
//   const userNameEmail = document.getElementById('defaultForm-email');
//   let createUser = '';
//   if (userNameInput === '') {
//     createUser = 'enterUser';
//   } else {
//     createUser = userNameInput.value;
//   }
//   const newUser = {
//     uid: userId.uid,
//     userName: userNameInput,
//     email: userNameEmail,
//   };
//   usersData.createNewUser(newUser)
//     .then(() => {
//       userNameInput.value = '';
//       userNameEmail.value = '';
//       resolve(newUser);
//     })
//     .catch(error => reject(error));
// });

//   // Get input values from each of the form elements
//   const email = $("#defaultForm-email").val();
//   const userName = $("#username-input").val();

//   // Push a new recommendation to the database using those values
//   recommendations.push({
//     "email": email,
//     "userName": userName,
//   });
// };


// const usersEvents = () => {
//   // document.getElementById('username-input').addEventListener('click', newUserLogin);
//   // document.getElementById('username-save-btn').addEventListener('click', newUserLogin); // save button
//   // const newUser = createNewUser();
//   console.error('add new user');
//   document.getElementById('new-user-btn').addEventListener('click', userNameModal);
// };

// const initlogin = () => {
//   usersEvents();
// };

export default { events };
