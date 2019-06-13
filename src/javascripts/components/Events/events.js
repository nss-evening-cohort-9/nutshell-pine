import eventsData from '../../helpers/data/eventsData';
import util from '../../helpers/util';
import './events.scss';

const printEventsToDom = (array) => {
  let itemToPrint = '<div class="card events-container">';
  itemToPrint += '    <h1>Events</h1>';
  itemToPrint += '    <img class="add-new-event-Button" src="../../../../assets/newEventIcon.png" />';
  array.forEach((event) => {
    itemToPrint += `  <div id=${event.id} class="action-icons-div">`;
    itemToPrint += '    <img class="editIcon" src="../../../../assets/editBtn.svg" />';
    itemToPrint += '    <img class="deleteIcon" src="../../../../assets/deleteBtn.png" />';
    itemToPrint += '  </div>';
    itemToPrint += `  <div id="card.${event.id}" class="each-event-card" >`;
    itemToPrint += `    <p id=date.${event.eventDate} class="event-date"><img class="eventIcon" src="../../../../assets/eventIcon.png" />${event.eventDate}</p>`;
    itemToPrint += `    <p id=name.${event.eventName}>${event.eventName} </p>`;
    itemToPrint += `    <p id="location.${event.id}" class="event-location">${event.eventLocation}</p>`;
    itemToPrint += '  </div>';
  });
  itemToPrint += '   </div>';
  util.printToDom('eventsComponentDiv', itemToPrint);
};


const initEventsForPageLoad = (uid) => {
  eventsData.iniEventsDataFromFirebaseByUid(uid)
    .then((allResults) => {
      printEventsToDom(allResults);
    })
    .catch(err => console.error('No data Came back', err));
};

export default { initEventsForPageLoad };
