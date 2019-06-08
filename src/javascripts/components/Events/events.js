import eventsData from '../../helpers/data/eventsData';
import util from '../../helpers/util';

const printEventsToDom = (array) => {
  let itemToPrint = '<div class="card text-center">';
  itemToPrint += '<h1>Events</h1>';
  array.forEach((event) => {
    itemToPrint += '<div class="card-header">';
    itemToPrint += `<h3>${event.eventName}</h3>`;
    itemToPrint += '</div>';
    itemToPrint += '<div class="card-body">';
    itemToPrint += '<div class="toast-header">';
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
