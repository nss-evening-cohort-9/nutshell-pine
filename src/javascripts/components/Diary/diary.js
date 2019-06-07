import util from '../../helpers/util';
import diaryData from '../../helpers/data/diaryData';

const diaryDomStringBuilder = () => {
  let domString = '<div class="col">';
  diaryData.getDiaryPostByUid().then((diaryPosts) => {
    diaryPosts.forEach((post) => {
      console.error(post.title);
      domString += `
      <div class="col-5 justify-content-center">
        <div class="card">
          <h2 class="h2">${post.title}</h2>
          <h5 class="h5">${post.date}</div>
          <p class="body">${post.entry}</p>
        </div>
      </div>`;
    });
    domString += '</div>';
    util.printToDom('diaryComponentDiv', domString);
  }).catch(err => console.error('could not get diary post', err));
};

export default { diaryDomStringBuilder };
