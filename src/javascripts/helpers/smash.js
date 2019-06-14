const buildMessagesArray = (usersArray, messagesArray) => messagesArray.map((message) => {
  const builtMessage = message;
  const matchingUser = usersArray.find(u => u.uid === message.uid);
  builtMessage.userName = matchingUser.userName;
  return builtMessage;
});

export default { buildMessagesArray };
