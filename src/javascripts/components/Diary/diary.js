import moment from 'moment';

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
  const newDiaryPostDate = moment().format('LLLL');
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
const diaryFormInputBuilder = (e, post) => { // e is only passed for sake of editObj
  const eventsFormDiv = '';
  const editedPostTitle = post ? post.title : '';
  const editedPostDate = post ? moment().format('LLLL') : moment().format('LLLL');
  const editedPostEntry = post ? post.entry : '';
  const editPostEvent = post ? 'submitBtnForEditDiaryPost' : 'submitBtnForNewDiaryPost';
  const domString = `
  <div>
    <div class="modalFormHeader">
      <i id="diaryMessageIconModal" class="far fa-comment"></i>
      <h4 class="diaryH4">Diary</h4>
      <span id="closeModalX"><i class="far fa-times-circle"></i></span>
    </div>
    <form id="diaryFormCreation" class="diaryFormInputs">
      <label for="diaryTitleInput">Post Title</label>
      <input id="diaryTitleInput" class="inputField" type="text" value="${editedPostTitle}"></input>
      <label class="hide" for="diaryDateInput">Date</label>
      <input id="diaryDateInput" class="hide inputField" type="text" value="${editedPostDate}"></input>
      <label for="diaryEntryInput">Entry</label>
      <textarea id="diaryEntryInput" rows="5" class="inputField" type="text">${editedPostEntry}</textarea>
      <button id="${editPostEvent}" type="submit" class="btn btn-primary">Post</button>
    </form>
  </div>`;
  util.printToDom('addNewCalendarEvent', eventsFormDiv); // clears out EVENTS from modal
  // also will need to do this for Saul
  util.printToDom('addNewDiaryPostFormDiv', domString);
  document.getElementById('closeModalX').addEventListener('click', () => {
    $('#pineModal').modal('toggle');
  });
  if (editPostEvent === 'submitBtnForNewDiaryPost') {
    document.getElementById('submitBtnForNewDiaryPost').addEventListener('click', newDiaryPost);
  } else if (editPostEvent === 'submitBtnForEditDiaryPost') {
    document.getElementById('submitBtnForEditDiaryPost').addEventListener('click', (evt) => {
      evt.preventDefault();
      const editedDiaryPostTitle = document.getElementById('diaryTitleInput').value;
      const editedDiaryPostDate = document.getElementById('diaryDateInput').value;
      const editedDiaryPostEntry = document.getElementById('diaryEntryInput').value;
      const editId = post.id;
      const editedDiaryPostObj = {
        title: editedDiaryPostTitle,
        date: editedDiaryPostDate,
        entry: editedDiaryPostEntry,
      };
      diaryData.editDiaryPost(editedDiaryPostObj, editId).then(() => {
        diaryDomStringBuilder(); // eslint-disable-line no-use-before-define
        $('#pineModal').modal('toggle');
      }).catch(err => console.error('nothing was edited from diary', err));
    });
  }
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
    <div class="ellipsisBtnDiv">
      <span id="closeModalX"><i class="far fa-times-circle"></i></span>
    </div>
    <div id="editDeleteDivWrapper">
      <button id="${ellipsisId}.edit" class="btn ellipsisBtnModal"><i class="fontAwesomeIcons fas fa-edit"></i>Edit Post</button>
      <button id="${ellipsisId}.delete" class="btn ellipsisBtnModal"><i class="fontAwesomeIcons fas fa-trash-alt"></i>Delete</button>
    </div>`;
  util.printToDom('addNewDiaryPostFormDiv', domString);
  document.getElementById('closeModalX').addEventListener('click', () => {
    $('#pineModal').modal('toggle');
  });
  posts.forEach((post) => {
    const deleteBtnTargetId = document.getElementById(`${ellipsisId}.delete`);
    const editBtnTargetId = document.getElementById(`${ellipsisId}.edit`);
    deleteBtnTargetId.addEventListener('click', (event) => {
      deleteDiaryPost(event, ellipsisId, post.id);
    });
    editBtnTargetId.addEventListener('click', (x) => {
      // editDiaryPost(x, ellipsisId, post);
      if (post.id === ellipsisId) {
        diaryFormInputBuilder(x, post);
      }
    });
  });
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// this function adds event listeners to unique id's on ellipsis' on diary cards and shows modal
const showEditDeleteModal4Diary = (posts) => {
  const diaryModalListeners = document.getElementsByClassName('ellipsisBtnSpan');
  for (let i = 0; i < diaryModalListeners.length; i += 1) {
    diaryModalListeners[i].addEventListener('click', (e) => {
      $('#pineModal').addClass('modalPositionEllipsis'); // adds class then ellipsis is pushed
      $('#pineModal').modal().show();
      diaryEllipsisDomForModal(e, posts);
    });
  }
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// this function is called to build the cards that contain the data of diary posts
const diaryDomStringBuilder = (user) => {
  let domString = `
  <div class="col diaryCardsDiv">
  <div id="addNewDiaryPostBtn" class="divForHeaderDiary">
      <span class="userIconSpan">
        <i class="far fa-user userIcon"></i>
      </span> 
      <p class="diaryHeadline">Deep thoughts, off-color remarks, etc.</p>
    <span class="addNewDiaryPostBtn">
      <i class="fas fa-plus-circle diaryFaBtn"></i>
    </span>
  </div>`;
  diaryData.getDiaryPostByUid().then((diaryPosts) => {
    diaryPosts.forEach((post, i) => {
      domString += `
      <div class="m-auto">
        <div class="card diaryCards text-center bg-light mt-4">
          <div class="user_date">
            <span class="diaryUserName"><em>${user}</em></span>
            <span class="postDate">${post.date}</span>
          </div>
          <h2 class="postTitle p-2">${post.title}</h2>
          <p class="body p-2 diaryEntry">${post.entry}</p>
          <span class="ellipsisBtnSpan">
            <i id="${post.id}.${i}" class="fas fa-ellipsis-h ellipsisBtn"></i>
          </span>
        </div>
      </div>`;
    });
    domString += '</div>';
    util.printToDom('diaryComponentDiv', domString);
    const addPostBtnId = document.getElementById('addNewDiaryPostBtn');
    addPostBtnId.addEventListener('click', (e) => {
      $('#pineModal').modal().show();
      diaryFormInputBuilder(e);
    });
    // calls function that adds events to ellipsis' on cards for edit and delete
    showEditDeleteModal4Diary(diaryPosts);
  }).catch(err => console.error('could not get diary post', err));
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export default { diaryDomStringBuilder, newDiaryPost };
