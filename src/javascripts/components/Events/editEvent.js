import $ from 'jquery';

import util from '../../helpers/util';


const testFun = (e) => {
  const getCurrentId = e.target.closest('.action-icons-div').id;
  const dateOfEvent = document.getElementById(`date.${getCurrentId}`).innerText;
  const nameOfEvent = document.getElementById(`name.${getCurrentId}`).innerText;
  const locationName = document.getElementById(`location.${getCurrentId}`).innerText;

  // Reformated date to be accepted for modal input-date field.
  const formattedDate = new Date(dateOfEvent).toISOString().slice(0, 10);


  $('#pineModal').modal().show();
  console.error(locationName);
  console.error(nameOfEvent);
  console.error(dateOfEvent);


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
        <input id="event-date-input" type="date" class="form-control" value=${formattedDate}></input>

        <label for="eventNameInput" class="col-form-label">Event Name: </label>
        <input id="event-name-input" type="text" class="form-control" value=${nameOfEvent}></input>

        <label for="eventLocationInput">Where: </label>
        <input id="event-location-input" type="text" class="form-control" value=${locationName}></input>

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

const eventLstnerForPageLoad = () => {
  $(document).on('click', '.editIcon', testFun);
};

export default { eventLstnerForPageLoad };
