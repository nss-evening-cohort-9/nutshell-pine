import newsData from '../../helpers/data/newsData';
import util from '../../helpers/util';
import './news.scss';

const domStringBuilder = (news) => {
  let domString = '';
  news.forEach((newsFeed) => {
    domString += '<div class="container">';
    domString += `<div class="title">${newsFeed.title}</div>`;
    domString += `<div class="synopsis">${newsFeed.synopsis}</div>`;
    domString += `<a href="${newsFeed.url}" class="link">${newsFeed.url}</a>`;
    domString += '</div>';
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
