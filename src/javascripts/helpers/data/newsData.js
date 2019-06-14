import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;


const newsDataFromFirebaseByUid = uid => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/news.json?orderBy="uid"&equalTo="${uid}"`)
    .then((results) => {
      const originalResults = results.data;
      const resultsObjWithId = [];
      Object.keys(originalResults).forEach((news) => {
        originalResults[news].id = news;
        resultsObjWithId.push(originalResults[news]);
      });
      resolve(resultsObjWithId);
    })
    .catch(err => reject(err));
});

export default { newsDataFromFirebaseByUid };
