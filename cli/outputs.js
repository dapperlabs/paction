// https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
exports.question = (question) => {
  console.log('\x1b[36m%s\x1b[0m', question);
};

exports.answer = (answer) => {
  console.log('\x1b[33m%s\x1b[0m', answer);
};
