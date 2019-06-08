import util from '../../helpers/util';

const dashboardLayoutStringBuilder = () => {
  const domString = `
  <div class="layout-wrapper">  
      <div id="messagesComponentDiv" class=""></div>
      <div id="diaryComponentDiv" class=""></div>
      <div id="newsComponentDiv" class=""></div>
      <div id="eventsComponentDiv" class=""></div>
      <nav id="appNav" class=""></nav>
  </div>`;
  util.printToDom('layout', domString);
};

export default { dashboardLayoutStringBuilder };
