import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';
import eventsData from '../../helpers/data/eventsData';
import events from './events';

const deleteSingleEventFromPage = (e) => {
  const getId = e.target.closest('.action-icons-div').id;
  eventsData.deleteEventFromPageAndFirebase(getId)
    .then(() => {
      const getCurrentUserUid = firebase.auth().currentUser.uid;
      events.initEventsItemForDom(getCurrentUserUid);
    })
    .catch(err => console.error('No event to delete', err));
};

const eventLstnrForDeleteBtn = () => {
  $(document).on('click', '.deleteIcon', deleteSingleEventFromPage);
};

export default { eventLstnrForDeleteBtn };
