exports.chooseOneOf = (name, choices) => {
  const options = choices
    .map((item, index) => {
      return `${index + 1}. ${item}\n`;
    })
    .join('');
  return `Please choose one of the following ${name}:\n${options}`;
};
