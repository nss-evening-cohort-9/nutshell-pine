import axios from 'axios';
import apiKeys from '../apiKeys.json';

const firebaseUrl = apiKeys.firebaseKeys.databaseURL;

const makeNewDiaryPost = diaryPostObject => axios.post(`${firebaseUrl}/diary.json`, diaryPostObject);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const getDiaryPostByUid = () => new Promise((resolve, reject) => {
  axios.get(`${firebaseUrl}/diary.json`)
    .then((results) => {
      const diaryPostResults = results.data;
      const diaryPosts = [];
      Object.keys(diaryPostResults).forEach((diaryPostId) => {
        diaryPostResults[diaryPostId].id = diaryPostId;
        diaryPosts.push(diaryPostResults[diaryPostId]);
      });
      resolve(diaryPosts);
    })
    .catch(err => reject(err));
});

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// deletes diary cards
const deleteDiaryPost = diaryPostId => axios.delete(`${firebaseUrl}/diary/${diaryPostId}.json`);

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// edit diary cards
const editDiaryPost = diaryPostId => axios.patch(`${firebaseUrl}/diary/${diaryPostId}.json`);

export default {
  getDiaryPostByUid,
  makeNewDiaryPost,
  deleteDiaryPost,
  editDiaryPost,
};
