const { entry } = require('./flows');
const { linebyline } = require('./cli/read');
const Pubsub = require('./utils/pubsub');

exports.start = () => {
  const inputs = Pubsub.singleton();

  const ask = (question) => {
    if (question) {
      console.log('\x1b[36m%s\x1b[0m', question);
    }
    return inputs.pop();
  };

  return linebyline(inputs, ask, entry);
};
