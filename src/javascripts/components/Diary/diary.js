import util from '../../helpers/util';
import diaryData from '../../helpers/data/diaryData';
// scss
import './diary.scss';
// for bootstrap modal functionality...
import $ from '../../../../node_modules/jquery';

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
    // id: // need to find a way to pass on the existing id
  };
  diaryData.makeNewDiaryPost(addDiaryPostObj)
    .then(() => {
      diaryDomStringBuilder(); // eslint-disable-line no-use-before-define
      $('#pineModal').modal('toggle');
    }).catch(err => console.error(err));
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// this function is called by an event listener at end of diaryDomString and builds the form into the modal
const diaryFormInputBuilder = (e, post) => { // e is only passed for sake of editObj
  // diaryPosts.forEach((post) => {
  console.error(e);
  if (e) { // this is a WIP point
    console.error('something', post);
  } else {
    console.error('not something');
  }
  // });
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

const editDiaryPost = (e, ellipsis, post) => {
  if (post.id === ellipsis) {
    const existingDiaryPostTitle = post.title;
    const existingDiaryPostDate = post.date;
    const existingDiaryPostEntry = post.entry;
    const editDiaryObj = {
      title: existingDiaryPostTitle,
      entry: existingDiaryPostEntry,
      date: existingDiaryPostDate,
    };
    // console.error(editDiaryObj.title);
    diaryFormInputBuilder(editDiaryObj, post);
    // diaryData.editDiaryPost(ellipsis).then(() => {
    //   diaryDomStringBuilder(); // eslint-disable-line no-use-before-define
    //   $('#pineModal').modal('toggle');
    // }).catch(err => console.error('nothing was edited from diary', err));
  }
  // I need to gather the old info and populate the input with said data, and then pass it back
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// click event calls this function to call the axios delete passing the id of a card which in firebase hosts the key/values
const deleteDiaryPost = (e, ellipsis, post) => {
  if (post === ellipsis) {
    diaryData.deleteDiaryPost(ellipsis).then(() => {
      diaryDomStringBuilder(); // eslint-disable-line no-use-before-define
      $('#pineModal').modal('toggle');
    }).catch(err => console.error('nothing was deleted from diary', err));
  }
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// this prints the delete and edit button into the modal for diary
const diaryEllipsisDomForModal = (e, posts) => {
  const ellipsisId = e.target.id.split('.')[0];
  const domString = `
    <div class="card">
      <button id="${ellipsisId}.edit" class="btn"><i class="p-2 fas fa-trash-alt"></i>Edit Post</button>
      <button id="${ellipsisId}.delete" class="btn"><i class="p-2 fas fa-pen"></i>Delete</button>
    </div>`;
  util.printToDom('addNewDiaryPostFormDiv', domString);
  posts.forEach((post) => {
    const deleteBtnTargetId = document.getElementById(`${ellipsisId}.delete`);
    const editBtnTargetId = document.getElementById(`${ellipsisId}.edit`);
    deleteBtnTargetId.addEventListener('click', (event) => {
      deleteDiaryPost(event, ellipsisId, post.id);
    });
    editBtnTargetId.addEventListener('click', (x) => {
      editDiaryPost(x, ellipsisId, post);
    });
  });
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// this function adds event listeners to unique id's on ellipsis' on diary cards and shows modal
const showEditDeleteModal4Diary = (posts) => {
  const diaryModalListeners = document.getElementsByClassName('fa-ellipsis-h');
  for (let i = 0; i < diaryModalListeners.length; i += 1) {
    diaryModalListeners[i].addEventListener('click', (e) => {
      $('#pineModal').modal().show();
      diaryEllipsisDomForModal(e, posts);
    });
  }
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
    diaryPosts.forEach((post, i) => {
      domString += `
      <div class="m-auto">
        <div class="card diaryCards text-center bg-light mt-4">
          <h2 class="postTitle p-2">${post.title}</h2>
          <i id="${post.id}.${i}" class="fas fa-ellipsis-h"></i>
          <h5 class="postDate">${post.date}</h5>
          <p class="body p-2">${post.entry}</p>
        </div>
      </div>`;
    });
    domString += '</div>';
    util.printToDom('diaryComponentDiv', domString);
    document.getElementById('addNewDiaryPostBtn').addEventListener('click', (e) => {
      $('#pineModal').modal().show();
      diaryFormInputBuilder(e);
    });
    // calls function that adds events to ellipsis' on cards for edit and delete
    showEditDeleteModal4Diary(diaryPosts);
  }).catch(err => console.error('could not get diary post', err));
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export default { diaryDomStringBuilder, newDiaryPost };
