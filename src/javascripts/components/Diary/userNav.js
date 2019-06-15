import util from '../../helpers/util';

const showUserNameInNavBar = (userName) => {
  const domString = `
  <h5>${userName}</h5>`;
  util.printToDom('welcomeUserName', domString);
};

export default { showUserNameInNavBar };
