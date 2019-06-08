import util from '../../helpers/util';
import diaryData from '../../helpers/data/diaryData';
// scss
import './diary.scss';
// for bootstrap modal functionality...
import $ from '../../../../node_modules/jquery';
// add button img

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// this function takes the input data from the form and axios posts to firebase
const newDiaryPost = (e) => {
  e.preventDefault();
  const newDiaryPostTitle = document.getElementById('diaryTitleInput').value;
  const newDiaryPostDate = document.getElementById('diaryDateInput').value;
  const newDiaryPostEntry = document.getElementById('diaryEntryInput').value;
  const addDiaryPostObj = {
    title: newDiaryPostTitle,
    date: newDiaryPostDate,
    entry: newDiaryPostEntry,
  };
  diaryData.makeNewDiaryPost(addDiaryPostObj)
    .then(() => {
      diaryDomStringBuilder() // eslint-disable-line no-use-before-define
        .catch(err => console.error('no diaryPosts called', err));
    }).catch(err => console.error(err));
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// this function is called by an event listener at end of diaryDomString and builds the form into the modal
const diaryFormInputBuilder = () => {
  // console.error(Date.now());
  const domString = `
  <div>
    <form id="diaryFormCreation" class="form-group">
      <label for="diaryTitleInput">Post Title</label><input id="diaryTitleInput" type="text"></input>
      <label for="diaryDateInput">Date</label><input id="diaryDateInput" type="date"></input>
      <label for="diaryEntryInput">Entry</label><input id="diaryEntryInput" type="text"></input>
      <button id="submitBtnForNewDiaryPost" type="submit" class="btn btn-primary">Post</button>
    </form>
  </div>`;
  util.printToDom('addNewDiaryPostFormDiv', domString);
  document.getElementById('submitBtnForNewDiaryPost').addEventListener('click', newDiaryPost);
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// this function is called to build the cards that contain the data of diary posts
const diaryDomStringBuilder = () => {
  let domString = `
  <div class="col diaryCardsDiv">
  <div><h1 class="h1 text-center diaryHeadline">Diary</h1></div>
  <div class="addNewDiaryPostBtn"><svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" class="actualSVG" viewBox="0 0 24 
  24"><path d="M0 0h24v24H0V0z"/><path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 
  10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg></div>`;
  diaryData.getDiaryPostByUid().then((diaryPosts) => {
    diaryPosts.forEach((post) => {
      domString += `
      <div class="col-6 p-5 m-auto">
        <div class="card text-center bg-light">
          <h2 class="h2 header bg-dark text-light p-2">${post.title}</h2>
          <h5 class="h5">${post.date}</h5>
          <p class="body p-2">${post.entry}</p>
        </div>
      </div>`;
    });
    domString += '</div>';
    util.printToDom('diaryComponentDiv', domString);
    document.getElementById('addNewDiaryPostBtn').addEventListener('click', (e) => {
      // const modalLaunch = document.getElementsByClassName('modal');
      $('#pineModal').modal().show();
      diaryFormInputBuilder(e);
    });
  }).catch(err => console.error('could not get diary post', err));
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export default { diaryDomStringBuilder, newDiaryPost };
