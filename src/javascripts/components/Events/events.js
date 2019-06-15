
import eventsData from '../../helpers/data/eventsData';
import util from '../../helpers/util';
import newEventIcon from '../../../../assets/newEventIcon.png';
import editIcon from '../../../../assets/editBtn.svg';
import deleteIcon from '../../../../assets/deleteBtn.png';
import eventIcon from '../../../../assets/eventIcon.png';

import './events.scss';

const printEventsToDom = (array) => {
  let itemToPrint = '<div class="card events-container">';
  itemToPrint += '    <h1>Events</h1>';
  itemToPrint += `    <img id="addNewEvent" class="add-new-event-Button" src="${newEventIcon}" />`;
  array.forEach((event) => {
    itemToPrint += `  <div id="${event.id}" class="action-icons-div">`;
    itemToPrint += `    <img class="editIcon" src="${editIcon}" />`;
    itemToPrint += `    <img class="deleteIcon" src="${deleteIcon}" />`;
    itemToPrint += '  </div>';
    itemToPrint += `  <div id="card.${event.id}" class="each-event-card" >`;
    itemToPrint += `    <p id=date.${event.id} class="event-date"><img class="eventIcon" src="${eventIcon}" />${event.eventDate}</p>`;
    itemToPrint += `    <p id=name.${event.id}>${event.eventName} </p>`;
    itemToPrint += `    <p id="location.${event.id}" class="event-location">${event.eventLocation}</p>`;
    itemToPrint += '  </div>';
  });
  itemToPrint += '   </div>';
  util.printToDom('eventsComponentDiv', itemToPrint);
};


const initEventsItemForDom = (uid) => {
  eventsData.iniEventsDataFromFirebaseByUid(uid)
    .then((allResults) => {
      printEventsToDom(allResults);
    })
    .catch(err => console.error('No data Came back', err));
};

export default { initEventsItemForDom };
