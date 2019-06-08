import messsagesData from '../../helpers/data/messagesData';
import util from '../../helpers/util';

const messagesStringBuilder = () => {
  messsagesData.getMessagesByUid()
    .then((messages) => {
      let domString = '';
      messages.forEach((message) => {
        domString += `<h1>${message.message}</h1>`;
        domString += `<h6 class= "timeStamp">${message.timeStamp}</h6>`;
        domString += `<h2 id =${message.id} class="edit-btn">${message.isEdited}</h2>`;
        domString += `<h2 id =${message.id} class="delete-btn"></h2>`;
      });
      util.printToDom('messagesComponentDiv', domString);
    })
    .catch(error => console.error('could not get messages', error));
};


export default { messagesStringBuilder };
