import firebase from 'firebase/app';
import 'firebase/auth';

import messagesData from '../../helpers/data/messagesData';
// import userData from '../../helpers/data/usersData';
import util from '../../helpers/util';
<<<<<<< HEAD
import './messages.scss';


const createNewMessage = () => {
  const newMessage = {
    userName: document.getElementById('username').value,
    message: document.getElementById('msg-input').value,
    // timestamp: document.getElementById('timeStamp').value,
    uid: firebase.auth().currentUser.uid,
  };
  return newMessage;
};
=======
// scss
import './messages.scss';
>>>>>>> master

const messagesStringBuilder = () => {
  let domString = '<div class="messageCardsDiv">';
  messagesData.getMessages()
    .then((messages) => {
      messages.forEach((message) => {
        domString += '<div class="card messageCard">';
        domString += `<h2 id="username">${message.uid}</h2>`;
        domString += '<div class="input-group">';
        domString += `<textarea class="form-control editBox  hide" id=${message.id} aria-label="With textarea">${message.messageText}</textarea>`;
        domString += `<div id="message"><p>${message.message}</p></div>`;
        domString += '</div>';
        if (message.uid === firebase.auth().currentUser.uid) {
          domString += `
            <button class="editMessage pt-1 ml-2" data-edit-id=${message.id}>Edit</button>
            <button class="deleteMessage pt-1" data-delete-id=${message.id}>Delete</button>
          </div>`;
        } else {
          domString += '</p></div>';
        }
        domString += '</div>';
        domString += '</div>';
      });
      util.printToDom('chatBox', domString);
    })
    .catch(error => console.error('could not get messages', error));
};

const displayMsgInput = () => {
  const domString = `
    <input type="text" class="form-control mr-1 msg-input" id="msg-input" placeholder="Enter new message">
    <button type="button" class="btn btn-secondary msg-input mr-1" id="msg-input-btn">Submit</button>
    <button type="button" class="btn btn-danger msg-input msg-refresh-btn">
      <i class="fas fa-redo msg-refresh-btn"></i>
    </button>`;
  util.printToDom('messageInput', domString);
};

const addNewMessage = (e) => {
  const newMessageObject = createNewMessage();
  const messageInput = newMessageObject.message;
  // if message is an empty string
  // if ((e.keyCode === 13 || e.target.id === 'msg-input-btn') && (messageInput === '')) {
  //   messageHelpers.messageInputError();
  // if message is not an empty string
  if ((e.keyCode === 13 || e.target.id === 'msg-input-btn') && (messageInput !== '')) {
    messagesData.addNewMessage(newMessageObject)
      .then(() => {
        messagesStringBuilder();
        // messageHelpers.resetMessageInput();
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

const messagesPage = () => {
  const getCurrentUid = () => firebase.auth().currentUser.uid;
  const uid = getCurrentUid();
  messagesData.getMessages(uid)
    .then(() => {
      messagesStringBuilder();
    })
    .catch((error) => {
      console.error('error in getting friends', error);
    });
};

const deleteMessage = (e) => {
  console.error(e.target);
  const idToDelete = e.target.dataset.deleteId;
  messagesData.deleteMessage(idToDelete)
    .then(() => {
      messagesPage();
      $('#chatbox').html('');
    })
    .catch((error) => {
      console.error('error in deleting message', error);
    });
};

const messageEvents = () => {
  document.getElementById('msg-input-btn').addEventListener('click', addNewMessage);
  const deleteButtons = document.getElementsByClassName('deleteMessage');
  for (let i = 0; i < deleteButtons.length; i += 1) {
    deleteButtons[i].addEventListener('click', deleteMessage);
  }
};

const initMessages = () => {
  messageEvents();
};

export default { messagesStringBuilder, displayMsgInput, initMessages };
