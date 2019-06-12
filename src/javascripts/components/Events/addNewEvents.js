import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import moment from 'moment';


import eventsData from '../../helpers/data/eventsData';
import util from '../../helpers/util';


const getValueInputForNewEvent = () => {
  let valueOfEventDate = moment(document.getElementById('event-date-input').value).format('LL');
  let valueOfEventName = document.getElementById('event-name-input').value;
  let valueOfLocation = document.getElementById('event-location-input').value;

  const newEventObj = {
    eventName: valueOfEventName,
    eventDate: valueOfEventDate,
    eventLocation: valueOfLocation,
    uid: firebase.auth().currentUser.uid,
  };

  eventsData.pushNewEventToFirebase(newEventObj)
    .then(() => {
      valueOfEventName = '';
      valueOfLocation = '';
      valueOfEventDate = '';
    })
    .catch(err => console.error(err));
};

const modalFormBuilderForNewEvent = () => {
  const clearDiaryStringForm = '';
  const domString = `
  <div>
    <button type="button" class="close" aria-label="Close" data-dismiss="modal">
      <span aria-hidden="true">&times;</span>
    </button>
    <form id="eventFormCreate" class="form-group">
    <h3 class="text-center">New Event</h3>

    <div class="modal-body">
    <form>
      <div class="form-group">
        <label for="event-date" class="col-form-label">Date: </label>
        <input id="event-date-input" type="date" class="form-control">

        <label for="eventNameInput" class="col-form-label">Event Name: </label>
        <input id="event-name-input" type="text" class="form-control"></input>

        <label for="eventLocationInput">Where: </label>
        <input id="event-location-input" type="text" class="form-control"></input>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button id="createNewEvent" type="submit" class="btn btn-primary create-event">Create Event</button>
       </div>
    </form>
    </div>
  </div>`;
  util.printToDom('addNewDiaryPostFormDiv', clearDiaryStringForm);
  util.printToDom('addNewCalendarEvent', domString);
  const postNewEventBtnId = document.getElementById('createNewEvent');
  postNewEventBtnId.addEventListener('click', getValueInputForNewEvent);
};


const eventListenerForPageLoad = () => {
  const getBtnId = document.getElementsByClassName('add-new-event-Button');
  for (let i = 0; i < getBtnId.length; i += 1) {
    getBtnId[i].addEventListener('click', () => {
      $('#pineModal').modal().show();
      modalFormBuilderForNewEvent();
    });
  }
};


export default { eventListenerForPageLoad };
