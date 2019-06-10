import moment from 'moment';

const getTimeStamp = () => {
  const timeStamp = moment().format('MMMM Do YYYY, h:mm:ss a');
  return timeStamp;
};

export default { getTimeStamp };