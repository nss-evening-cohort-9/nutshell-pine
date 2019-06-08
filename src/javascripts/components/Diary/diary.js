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
      diaryDomStringBuilder(); // eslint-disable-line no-use-before-define
      $('#pineModal').modal('toggle');
    }).catch(err => console.error(err));
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// this function is called by an event listener at end of diaryDomString and builds the form into the modal
const diaryFormInputBuilder = () => {
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
  <div class="divForHeaderDiary">
      <h1 class="diaryHeadline">Diary</h1>
    <span class="addNewDiaryPostBtn">
      <i id="addNewDiaryPostBtn" class="fas fa-plus-circle diaryFaBtn"></i>
    </span>
  </div>`;
  diaryData.getDiaryPostByUid().then((diaryPosts) => {
    diaryPosts.forEach((post) => {
      domString += `
      <div class="m-auto">
        <div class="card diaryCards text-center bg-light mt-4">
          <h2 class="postTitle p-2">${post.title}</h2>
          <h5 class="postDate">${post.date}</h5>
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
