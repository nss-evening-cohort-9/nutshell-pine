import $ from 'jquery';
import util from '../../helpers/util';


const testFun = (e) => {
  const test = e.target.closest('.action-icons-div').id;
  const test2 = document.getElementById(`location.${test}`).innerText;
  $('#pineModal').modal().show();
  const textToShow = `<input value${test2}=></input>`;
  util.printToDom('footer', textToShow);
  console.error(test2);
};

const eventLstnerForPageLoad = () => {
  $(document).on('click', '.editIcon', testFun);
};

export default { eventLstnerForPageLoad };
