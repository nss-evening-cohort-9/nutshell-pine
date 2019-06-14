import diary from '../Diary/diary';

const dashboardAddEventListeners = () => {
  const messagesNavBtn = document.getElementById('messagesNavBtn');
  const newsNavBtn = document.getElementById('newsNavBtn');
  const eventsNavBtn = document.getElementById('eventsNavBtn');
  const messagesComponentDiv = document.getElementById('messagesComponentDiv');
  const newsComponentDiv = document.getElementById('newsComponentDiv');
  const eventsComponentDiv = document.getElementById('eventsComponentDiv');

  messagesNavBtn.addEventListener('click', () => {
    messagesComponentDiv.classList.toggle('hide');
  });
  newsNavBtn.addEventListener('click', () => {
    newsComponentDiv.classList.toggle('hide');
  });
  eventsNavBtn.addEventListener('click', () => {
    eventsComponentDiv.classList.toggle('hide');
  });

  const addPostBtnId = document.getElementById('addNewDiaryPostBtn');
  addPostBtnId.addEventListener('click', (e) => {
    $('#pineModal').modal().show();
    diary.diaryFormInputBuilder(e);
  });
};

export default { dashboardAddEventListeners };
