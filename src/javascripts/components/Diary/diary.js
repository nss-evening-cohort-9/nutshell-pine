import util from '../../helpers/util';
import diaryData from '../../helpers/data/diaryData';
// scss
import './diary.scss';

const diaryDomStringBuilder = () => {
  let domString = '<div class="col diaryCardsDiv">';
  domString += '<div><h1 class="h1 text-dark text-center">Diary</h1></div>';
  diaryData.getDiaryPostByUid().then((diaryPosts) => {
    diaryPosts.forEach((post) => {
      domString += `
      <div class="col-6 p-5 m-auto">
        <div class="card text-center bg-light">
          <h2 class="h2 header bg-dark text-light p-2">${post.title}</h2>
          <h5 class="h5">${post.date}</h5>
          <p class="body p-2">${post.entry}</p>
        </div>
      </div>`;
    });
    domString += '</div>';
    util.printToDom('diaryComponentDiv', domString);
  }).catch(err => console.error('could not get diary post', err));
};

export default { diaryDomStringBuilder };
