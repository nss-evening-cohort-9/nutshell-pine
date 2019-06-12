
import eventsData from '../../helpers/data/eventsData';
// import actionEvents from './addNewEvents';
import util from '../../helpers/util';

import './events.scss';

const printEventsToDom = (array) => {
  let itemToPrint = '<div class="card events-container">';
  itemToPrint += '    <h1>Events</h1>';
  itemToPrint += '    <img id="addNewEvent" class="add-new-event-Button" src="../../../../assets/newEventIcon.png" />';
  array.forEach((event) => {
    itemToPrint += `  <div id="${event.id}" class="action-icons-div">`;
    itemToPrint += '    <img class="editIcon" src="../../../../assets/editBtn.svg" />';
    itemToPrint += '    <img class="deleteIcon" src="../../../../assets/deleteBtn.png" />';
    itemToPrint += '  </div>';
    itemToPrint += `  <div id="card.${event.id}" class="each-event-card" >`;
    itemToPrint += `    <p class="event-date"><img class="eventIcon" src="../../../../assets/eventIcon.png" />${event.eventDate}</p>`;
    itemToPrint += `    <p>${event.eventName} </p>`;
    itemToPrint += `    <p class="event-location">${event.eventLocation}</p>`;
    itemToPrint += '  </div>';
  });
  itemToPrint += '   </div>';
  util.printToDom('eventsComponentDiv', itemToPrint);
  // actionEvents.eventListenerForPageLoad();
};


const initEventsItemForDom = (uid) => {
  eventsData.iniEventsDataFromFirebaseByUid(uid)
    .then((allResults) => {
      printEventsToDom(allResults);
    })
    .catch(err => console.error('No data Came back', err));
};

export default { initEventsItemForDom };
