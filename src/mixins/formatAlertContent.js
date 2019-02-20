
const formatContent = (messageObject) => {
  let content = '<ul>';
  const messagesArray = Object.entries(messageObject);
  messagesArray.forEach((messages) => {
    if (Array.isArray(messages[1])) {
      messages[1].forEach((message) => {
        content += `<li>${message}</li>`;
      });
    } else {
      content += `<li>${messages[1]}</li>`;
    }
  });
  content += '</ul>';
  // eslint-disable-next-line no-self-assign
  content = (content);
  return content;
};
export default formatContent;
