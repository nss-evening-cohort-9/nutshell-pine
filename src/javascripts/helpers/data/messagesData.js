import axios from 'axios';

import apiKeys from '../apiKeys.json';


const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getMessagesByUid = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/messages.json`)
    .then((results) => {
      const messagesResults = results.data;
      const messages = [];
      Object.keys(messagesResults).forEach((messagesId) => {
        messagesResults[messagesId].id = messagesId;
        messages.push(messagesResults[messagesId]);
      });
      resolve(messages);
    })
    .catch(error => reject(error));
});

const addNewMessage = messageObject => axios.post(`${firebaseUrl}/messages.json`, messageObject);

export default { getMessagesByUid, addNewMessage };
