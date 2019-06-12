const printToDom = (divId, textToPrint) => {
  console.error(divId, textToPrint);
  const selectedDiv = document.getElementById(divId);
  selectedDiv.innerHTML = textToPrint;
};

export default { printToDom };
