import eventsData from '../../helpers/data/eventsData';
import util from '../../helpers/util';
import './events.scss';

const printEventsToDom = (array) => {
  let itemToPrint = '<div class="card events-container">';
  itemToPrint += '<h1>Events</h1>';
  array.forEach((event) => {
    itemToPrint += `<div id="${event.id}" class="each-event-card " >`;
    itemToPrint += '<section>';
    itemToPrint += '<img class="deleteIcon" src="https://image.flaticon.com/icons/png/512/61/61795.png" />';
    itemToPrint += '</section>';
    itemToPrint += `<p>${event.eventName} </p>`;
    itemToPrint += '<div class="showMoreDetails d-none">';
    itemToPrint += `<p>${event.eventDate}..${event.eventLocation}</p>`;
    itemToPrint += '</div>';
    itemToPrint += '</div>';
  });
  itemToPrint += '</div>';
  util.printToDom('eventsComponentDiv', itemToPrint);
};


const initEventsForPageLoad = () => {
  eventsData.iniEventsDataFromFirebase()
    .then((allResults) => {
      printEventsToDom(allResults);
    })
    .catch(err => console.error('No data Came back', err));
};

export default { initEventsForPageLoad };
