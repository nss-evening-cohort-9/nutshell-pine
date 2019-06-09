import $ from 'jquery';

const AddNewEvent = (e) => {
  const test = e.target.id;
  console.error(test);
  $('#pineModalEvents').modal().show();
};


const eventListenerForPageLoad = () => {
  const getBtnId = document.getElementsByClassName('add-new-event-Button');

  for (let i = 0; i < getBtnId.length; i += 1) {
    getBtnId[i].addEventListener('click', AddNewEvent, false);
  }
};


export default { eventListenerForPageLoad };
