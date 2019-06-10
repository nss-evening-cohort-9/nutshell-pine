import $ from 'jquery';

// import util from '../../helpers/util';

// const newEventForm = () => {
//   const itemToPrint = '<h1>test</h1>';
// };

const AddNewEvent = (e) => {
  const test = e.target.id;
  console.error(test);
  $('#newEventModal').modal().show();
};


const eventListenerForPageLoad = () => {
  const getBtnId = document.getElementsByClassName('add-new-event-Button');

  for (let i = 0; i < getBtnId.length; i += 1) {
    getBtnId[i].addEventListener('click', AddNewEvent, false);
  }
};


export default { eventListenerForPageLoad };
