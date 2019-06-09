import firebase from 'firebase/app';
import 'firebase/auth';

import messagesData from '../../helpers/data/messagesData';
// import userData from '../../helpers/data/usersData';
import util from '../../helpers/util';
import './messages.scss';

// new object to create a new message
const createNewMessage = () => {
  const newMessage = {
    userName: document.getElementById('username').value,
    message: document.getElementById('msg-input').value,
    // timestamp: document.getElementById('timeStamp').value,
    uid: firebase.auth().currentUser.uid,
  };
  return newMessage;
};

// delete message function where we target the button id of the message we are wanting to delete
// once the correct message is selected, we delete the message from the page and then it is deleted in firebas
const deleteMessage = (e) => {
  console.error(e.target.closest('button').id);
  // targets correct message to delete //
  const messageId = e.target.closest('button').id;
  // deletes message in firebase
  messagesData.deleteMessage(messageId)
    .then(() => {
      // reprints the updated domstring (chatbox) excluding the deleted message
      messagesStringBuilder(); // eslint-disable-line no-use-before-define
    })
    .catch(error => console.error('delete does not work', error));
};

const editMessage = (e) => {
  console.error(e.target.closest('button').id);
  const messageId = e.target.closest('button').id;
  messagesData.editMessage(messageId)
    .then(() => {
      messagesStringBuilder(); // eslint-disable-line no-use-before-define
    })
    .catch(error => console.error('edit does not work', error));
};

const messagesStringBuilder = () => {
  let domString = '<div class="messageCardsDiv">';
  messagesData.getMessages()
    .then((messages) => {
      messages.forEach((message) => {
        domString += '<div class="card messageCard">';
        domString += `<h2 id="username">${message.uid}</h2>`;
        domString += '<div class="input-group">';
        domString += `<div id="message"><p>${message.message}</p></div>`;
        domString += '</div>';
        if (message.uid === firebase.auth().currentUser.uid) {
          domString += `
            <button class="editMessage pt-1 ml-2" id=${message.id}>Edit</button>
            <button class="deleteMessage pt-1" id=${message.id}>Delete</button>
          </div>`;
        } else {
          domString += '</p></div>';
        }
        domString += '</div>';
        domString += '</div>';
      });
      util.printToDom('chatBox', domString);
      // called this function after we are printing because the delete button needs to be on page
      // in order for us to add an event listener to it
      // this defines the delete button and the loops through and adds an event listener on button click
      const deleteButtons = document.getElementsByClassName('deleteMessage');
      for (let i = 0; i < deleteButtons.length; i += 1) {
        deleteButtons[i].addEventListener('click', deleteMessage);
      }
      const editButtons = document.getElementsByClassName('editMessage');
      for (let i = 0; i < editButtons.length; i += 1) {
        editButtons[i].addEventListener('click', editMessage);
      }
    })
    .catch(error => console.error('could not get messages', error));
};

// this is where the textbox is to type your message, located directly below the chatbox container //
const displayMsgInput = () => {
  const domString = `
    <input type="text" class="form-control mr-1 msg-input" id="msg-input" placeholder="Enter new message">
    <button type="button" class="btn btn-secondary msg-input mr-1" id="msg-input-btn">Submit</button>
    <button type="button" class="btn btn-danger msg-input msg-refresh-btn">
      <i class="fas fa-redo msg-refresh-btn"></i>
    </button>`;
  util.printToDom('messageInput', domString);
};

// this function adds a new message
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

// event listener for add message
const messageEvents = () => {
  document.getElementById('msg-input-btn').addEventListener('click', addNewMessage);
};

// init function that holds events
const initMessages = () => {
  messageEvents();
};

export default { messagesStringBuilder, displayMsgInput, initMessages };
