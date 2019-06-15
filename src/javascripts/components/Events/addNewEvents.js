import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import moment from 'moment';

import eventsData from '../../helpers/data/eventsData';
import events from './events';
import util from '../../helpers/util';


const getValueInputForNewEvent = () => {
  const uidFirebase = firebase.auth().currentUser.uid;
  let valueOfEventDate = moment(document.getElementById('event-date-input').value).format('LL');
  let valueOfEventName = document.getElementById('event-name-input').value;
  let valueOfLocation = document.getElementById('event-location-input').value;

  const newEventObj = {
    eventName: valueOfEventName,
    eventDate: valueOfEventDate,
    eventLocation: valueOfLocation,
    uid: uidFirebase,
  };

  eventsData.pushNewEventToFirebase(newEventObj)
    .then(() => {
      events.initEventsItemForDom(uidFirebase);
      valueOfEventName = '';
      valueOfLocation = '';
      valueOfEventDate = '';
    })
    .catch(err => console.error(err));
};


const modalFormBuilderForNewEvent = () => {
  $('#pineModal').modal().show();
  const clearDiaryStringForm = '';
  const domString = `
  <div>
    <button type="button" class="close" aria-label="Close" data-dismiss="modal">
      <span aria-hidden="true">&times;</span>
    </button>
    <form id="eventFormCreate" class="form-group">
    <h3 class="text-center">Event</h3>

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
          <button id="createNewEvent" type="button" class="btn btn-primary create-event" data-dismiss="modal">Create Event</button>
       </div>
    </form>
    </div>
  </div>`;
  util.printToDom('addNewDiaryPostFormDiv', clearDiaryStringForm);
  util.printToDom('addNewCalendarEvent', domString);
};


const eventListenerForPageLoad = () => {
  $(document).on('click', '.add-new-event-Button', modalFormBuilderForNewEvent);
  $(document).on('click', '#createNewEvent', getValueInputForNewEvent);
};


export default { eventListenerForPageLoad };
