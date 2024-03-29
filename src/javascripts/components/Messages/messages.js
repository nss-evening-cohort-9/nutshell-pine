import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import timeStamp from './messageHelpers';

import messagesData from '../../helpers/data/messagesData';
import usersData from '../../helpers/data/usersData';
import util from '../../helpers/util';
import './messages.scss';

const getCurrentUsername = () => firebase.auth().currentUser.displayName;

// new object to create a new message
const createNewMessage = () => {
  const newMessage = {
    userName: document.getElementById('username').value,
    message: document.getElementById('msg-input').value,
    timestamp: timeStamp.getTimeStamp().toString(),
    uid: firebase.auth().currentUser.uid,
    displayName: getCurrentUsername(),
  };
  return newMessage;
};

// delete message function where we target the button id of the message we are wanting to delete
// once the correct message is selected, we delete the message from the page and then it is deleted in firebase
const deleteMessage = (e) => {
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

// placeholder to fill in later for each unique message id when clicked
// we need specific edit id elsewhere outside function because if you call edit //
// created messageEdit id so that is could equal editButtonId ( which is the closest button) so that
// we could use this outside the function
let messageEditId = 'id';

// this is the function where we select the message we want to edit and place it in the input box to change
const selectEditMessage = (e) => {
  const editButtonId = e.target.closest('button').id;
  messagesData.getOneMessage(editButtonId)
    .then((oneMessage) => {
      // this is where we set the value of the input area to equal the closest message //
      // from the edit button we clicked //
      document.getElementById('msg-input').value = (oneMessage.message);
      // toggling the save message button and the submit button when we hit edit
      document.getElementById('save-msg').classList.toggle('hideStuff');
      document.getElementById('msg-input-btn').classList.toggle('hideStuff');
      messageEditId = editButtonId;
    })
    .catch((error) => {
      console.error('error in getting message to edit', error);
    });
};


// this is the function that updates the message and then saves the updated message back to the page and firebase
const updateMessage = (e) => {
  const messageObject = createNewMessage();
  const messageId = messageEditId;
  messagesData.editMessage(messageObject, messageId)
    .then(() => {
      // traversed the dom to find out where the sumbit and save button were on the tree
      e.target.parentNode.childNodes[3].classList.toggle('hideStuff'); // submit button
      e.target.parentNode.childNodes[5].classList.toggle('hideStuff'); // save button
      messagesData.updateIsEdited(messageId, true)
        .then();
      messagesStringBuilder(); // eslint-disable-line no-use-before-define
      document.getElementById('msg-input').value = '';
    })
    .catch((error) => {
      console.error('error in editing message', error);
    });
};

// domString where we get our messages from firebase - this includes all the messages
const messagesStringBuilder = () => {
  let domString = '<div class="messageCardsDiv">';
  let username = '';
  usersData.getUsers().then((usersArray) => {
    messagesData.getMessages()
      .then((messagesArray) => {
        messagesArray.forEach((message) => {
          for (let i = 0; i < usersArray.length; i += 1) {
            if (usersArray[i].uid === message.uid) {
              username = usersArray[i].userName;
              break;
            } else if (usersArray[i].uid !== message.uid) {
              username = message.uid;
            }
          }
          domString += '<div class="card messageCard">';
          domString += `<h2 id="username">${username}</h2>`;
          domString += '<div class="input-group">';
          domString += '<div class ="col">';
          domString += `<div id="message"><p>${message.message}</p></div>`;
          domString += '</div>';
          domString += `<h6 id="timestamp">${message.timestamp} </h6>`;
          domString += '</div>';
          // this logic says that if the user is signed in, the edit and delete button will show up on their message and they
          // can edit or delete
          if (message.uid === firebase.auth().currentUser.uid) {
            domString += `
            <div class="d-flex flex-row">
            <button class="editMessage pt-1 ml-2" id=${message.id}><i class="fas fa-edit"></i></button>
            <button class="deleteMessage pt-1 ml-2" id=${message.id}><i class="fas fa-trash-alt"></i></button>
            </div>
          </button>`;
            // if they are not signed in, the edit and delete buttons will not show up and
            // they are unable to edit or delete
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
          editButtons[i].addEventListener('click', selectEditMessage);
        }
      })
      .catch(error => console.error('could not get messages', error));
  })
    .catch(error => console.error('could not get messages', error));
};


const enterSubmit = () => {
  $('#msg-input').on('keyup', (e) => {
    if (e.keyCode === 13) {
      $('#msg-input-btn').trigger('click');
    }
  });
};

// this is where the textbox is to type your message, located directly below the chatbox container //
const displayMsgInput = () => {
  const domString = `
    <input type="text" class="form-control mr-1 msg-input" id="msg-input" placeholder="Enter new message">
    <button type="button" class="btn btn-secondary msg-input mr-1" id="msg-input-btn">Submit</button>
    <button type="button" class = "btn btn-secondary hideStuff" id="save-msg">Save</button>`;
  util.printToDom('messageInput', domString);
  enterSubmit();
};

// this function adds a new message
const addNewMessage = () => {
  const newMessageObject = createNewMessage();
  const messageInput = newMessageObject.message;
  if (messageInput !== '') {
    messagesData.addNewMessage(newMessageObject)
      .then(() => {
        messagesStringBuilder();
        document.getElementById('msg-input').value = '';
      })
      .catch((error) => {
        console.error(error);
      });
  }
};

// event listener for add message
const messageEvents = () => {
  document.getElementById('msg-input-btn').addEventListener('click', addNewMessage);
  document.getElementById('save-msg').addEventListener('click', updateMessage);
};

// init function that holds events
const initMessages = () => {
  messageEvents();
};

export default { messagesStringBuilder, displayMsgInput, initMessages };
