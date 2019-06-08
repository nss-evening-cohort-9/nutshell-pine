import eventsData from '../../helpers/data/eventsData';
import util from '../../helpers/util';

const printEventsToDom = (array) => {
  let itemToPrint = '<div class="card text-center">';
  itemToPrint += '<h1>Events</h1>';
  array.forEach((event) => {
    itemToPrint += `<div id="${event.id}" class="card-header each-event-card " >`;
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
