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
};

export default { dashboardAddEventListeners };
