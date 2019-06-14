import axios from 'axios';

import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getUsers = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/users.json`)
    .then((result) => {
      const usersObject = result.data;
      const usersArray = [];
      if (usersArray !== null) {
        Object.keys(usersObject).forEach((userId) => {
          usersObject[userId].id = userId;
          usersArray.push(usersObject[userId]);
        });
      }
      resolve(usersArray);
    })
    .catch((err) => {
      reject(err);
    });
});

const createNewUser = userObject => axios.post(`${firebaseUrl}/users.json`, (userObject));

export default { getUsers, createNewUser };
