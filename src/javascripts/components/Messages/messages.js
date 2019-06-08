import firebase from 'firebase/app';
import 'firebase/auth';

import messsagesData from '../../helpers/data/messagesData';
// import userData from '../../helpers/data/usersData';
import util from '../../helpers/util';
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

const messagesStringBuilder = () => {
  let domString = '<div class="messageCardsDiv">';
  messsagesData.getMessages()
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
            <button class="editMessageButton pt-1 ml-2" data-edit-id=${message.id}>Edit</button>
            <button class="deleteMessageButton pt-1" data-delete-id=${message.id}>Delete</button>
          </div>`;
        } else {
          domString += '</p></div>';
        }
        // domString += `<button type="button" id="${message.id}" class="btn btn-danger edit">Edit</button>`;
        // domString += `<button type="button" id="${message.id}" class="btn btn-danger save  hide">Save</button>`;
        // // domString += `<p id="id">Message ID: ${message.message} </p>`;
        // // domString += `<h6 id="timestamp">${message.timestamp} </h6>`;
        // domString += `<button type="button" id="${message.id}" class="btn btn-danger delete">Delete</button>`;
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
    messsagesData.addNewMessage(newMessageObject)
      .then(() => {
        messagesStringBuilder();
        // messageHelpers.resetMessageInput();
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

const messageEvents = () => {
  document.getElementById('msg-input-btn').addEventListener('click', addNewMessage);
};

const initMessages = () => {
  messageEvents();
};

export default { messagesStringBuilder, displayMsgInput, initMessages };
