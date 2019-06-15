import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import moment from 'moment';

import eventsData from '../../helpers/data/eventsData';
import event from './events';
import util from '../../helpers/util';


const testFun = (e) => {
  const getCurrentId = e.target.closest('.action-icons-div').id;
  const dateOfEvent = document.getElementById(`date.${getCurrentId}`).innerText;
  const nameOfEvent = document.getElementById(`name.${getCurrentId}`).innerText;
  const locationName = document.getElementById(`location.${getCurrentId}`).innerText;

  // Reformated date to be accepted for modal input-date field.
  let formattedDate = '';
  if (dateOfEvent === 'Invalid date') {
    formattedDate = '2019-01-01';
  } else {
    formattedDate = new Date(dateOfEvent).toISOString().slice(0, 10);
  }

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
        <input id="event-date-input" type="date" class="form-control" value=${formattedDate}></input>

        <label for="eventNameInput" class="col-form-label">Event Name: </label>
        <input id="event-name-input" type="text" class="form-control" value=${nameOfEvent}></input>

        <label for="eventLocationInput">Where: </label>
        <input id="event-location-input" type="text" class="form-control" value=${locationName}></input>

        <div class="modal-footer" id=${getCurrentId}>
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button id="saveEventChange" type="button" class="btn btn-primary create-event" data-dismiss="modal">Save Changes</button>
       </div>
    </form>
    </div>
  </div>`;
  util.printToDom('addNewDiaryPostFormDiv', clearDiaryStringForm);
  util.printToDom('addNewCalendarEvent', domString);
};

const updatedValueOfEvent = (e) => {
  const getCurrentId = e.target.closest('.modal-footer').id;
  const uidFirebase = firebase.auth().currentUser.uid;
  let valueOfEventDate = moment(document.getElementById('event-date-input').value).format('LL');
  let valueOfEventName = document.getElementById('event-name-input').value;
  let valueOfLocation = document.getElementById('event-location-input').value;
  const eventChangeNewObj = {
    eventName: valueOfEventName,
    eventDate: valueOfEventDate,
    eventLocation: valueOfLocation,
    uid: uidFirebase,
  };
  eventsData.editEventNUpdateFirebase(getCurrentId, eventChangeNewObj)
    .then(() => {
      event.initEventsItemForDom(uidFirebase);
      valueOfEventName = '';
      valueOfLocation = '';
      valueOfEventDate = '';
    })
    .catch(err => console.error('No Item to update', err));
};

const eventLstnerForPageLoad = () => {
  $(document).on('click', '.editIcon', testFun);
  $(document).on('click', '#saveEventChange', updatedValueOfEvent);
};

export default { eventLstnerForPageLoad };
