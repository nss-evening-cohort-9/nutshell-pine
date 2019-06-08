import axios from 'axios';

import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const getMessagesByUid = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/messages.json?orderBy="userUid"&equalTo="${uid}"`)
    .then((result) => {
      const messagesObject = result.data;
      const messagesArray = [];
      if (messagesArray !== null) {
        Object.keys(messagesObject).forEach((messageId) => {
          messagesObject[messageId].id = messageId;
          messagesArray.push(messagesObject[messageId]);
        });
      }
      resolve(messagesArray);
    })
    .catch(error => reject(error));
});

const getMessages = () => new Promise((resolve, reject) => {
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

export default { getMessages, addNewMessage, getMessagesByUid };
