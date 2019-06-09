
const AddNewEvent = (e) => {
  const test = e.target.closest('.action-icons-div').id;
  console.error(test);
};


const eventListenerForPageLoad = () => {
  const getBtnId = document.getElementsByClassName('add-new-event-Button');

  for (let i = 0; i < getBtnId.length; i += 1) {
    getBtnId[i].addEventListener('click', AddNewEvent);
  }
};


export default { eventListenerForPageLoad };
