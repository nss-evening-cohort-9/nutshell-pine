import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;


const iniEventsDataFromFirebase = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/events.json`)
    .then((results) => {
      const originalResults = results.data;
      const resultsObjWithId = [];
      Object.keys(originalResults).forEach((event) => {
        originalResults[event].id = event;
        resultsObjWithId.push(originalResults[event]);
      });
      resolve(resultsObjWithId);
    })
    .catch(err => reject(err));
});

export default { iniEventsDataFromFirebase };
