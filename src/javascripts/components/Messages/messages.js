import messsagesData from '../../helpers/data/messagesData';
import util from '../../helpers/util';
// scss
import './messages.scss';

const messagesStringBuilder = () => {
  let domString = '<div class="col messageCardsDiv">';
  messsagesData.getMessagesByUid()
    .then((messages) => {
      messages.forEach((message) => {
        domString += '<div class="card messageCard">';
        domString += `<h2 id="username">${message.uid}</h2>`;
        domString += '<div class="input-group">';
        domString += `<textarea class="form-control editBox  hide" id=${message.id} aria-label="With textarea">${message.messageText}</textarea>`;
        domString += `<div id=${message.id}><p>${message.message}</p></div>`;
        domString += '</div>';
        domString += `<button type="button" id="${message.id}" class="btn btn-danger edit">Edit</button>`;
        domString += `<button type="button" id="${message.id}" class="btn btn-danger save  hide">Save</button>`;
        domString += `<p id="id">Message ID: ${message.id} </p>`;
        domString += `<h6 id="timestamp">${message.timestamp} </h6>`;
        domString += `<button type="button" id="${message.id}" class="btn btn-danger delete">Delete</button>`;
        domString += '</div>';
        domString += '</div>';
      });
      util.printToDom('messagesComponentDiv', domString);
    })
    .catch(error => console.error('could not get messages', error));
};


export default { messagesStringBuilder };
