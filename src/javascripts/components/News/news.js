import newsData from '../../helpers/data/newsData';
import util from '../../helpers/util';
import './news.scss';

const domStringBuilder = (news) => {
  let domString = '';
  news.forEach((newsFeed) => {
    domString += `<div>${newsFeed.title}</div>`;
    domString += `<div>${newsFeed.synopsis}</div>`;
    domString += `<a href="${newsFeed.url}">${newsFeed.url}</a>`;
  });
  util.printToDom('newsComponentDiv', domString);
};


const initNews = (uid) => {
  newsData.newsDataFromFirebaseByUid(uid)
    .then((allResults) => {
      domStringBuilder(allResults);
    })
    .catch(err => console.error('No data came back', err));
};

export default { initNews };
