import eventsData from '../../helpers/data/eventsData';
import util from '../../helpers/util';

const printEventsToDom = (array) => {
  let itemToPrint = '<div>';
  array.forEach((event) => {
    itemToPrint += `<p>${event.id}</p>`;
    itemToPrint += `<p>${event.eventName}</p>`;
    itemToPrint += `<p>${event.eventDate}</p>`;
    itemToPrint += `<p>${event.eventLocation}</p>`;
  });
  util.printToDom('all-events', itemToPrint);
};


const initEventsForPageLoad = () => {
  eventsData.iniEventsDataFromFirebase()
    .then((allResults) => {
      printEventsToDom(allResults);
    })
    .catch(err => console.error('No data Came back', err));
};

export default { initEventsForPageLoad };
