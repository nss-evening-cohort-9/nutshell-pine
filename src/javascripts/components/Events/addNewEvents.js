import $ from 'jquery';

import util from '../../helpers/util';

// const newEventForm = () => {
//   const itemToPrint = '<h1>test</h1>';
// };
const diaryFormInputBuilder = () => {
  const diaryString = '';
  const domString = `
  <div>
    <form id="eventFormCreate" class="form-group">
    <h1>Add new Event</h1>
    <label for="EventDateInput">Date</label><input id="EventDateInput" type="date"></input>
      <label for="eventNameInput">Event Name</label><input id="eventNameInput" type="text"></input>
      <label for="eventLocationInput">Address</label><input id="eventLocationInput" type="text"></input>
      <button id="createNewEvent" type="submit" class="btn btn-primary">Create Event</button>
    </form>
  </div>`;
  util.printToDom('addNewDiaryPostFormDiv', diaryString);
  util.printToDom('addNewCalendarEvent', domString);
};

const AddNewEvent = (e) => {
  const test = e.target.id;
  console.error(test);
  $('#pineModal').modal().show();
  diaryFormInputBuilder();
};

const eventListenerForPageLoad = () => {
  const getBtnId = document.getElementsByClassName('add-new-event-Button');

  for (let i = 0; i < getBtnId.length; i += 1) {
    getBtnId[i].addEventListener('click', AddNewEvent, false);
  }
};


export default { eventListenerForPageLoad };
