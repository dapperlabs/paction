const { entry } = require('./flows');
const { linebyline } = require('./cli/read');
const Pubsub = require('./utils/pubsub');
const outputs = require('./cli/outputs');

exports.start = () => {
  const inputs = Pubsub.singleton();

  const ask = (question) => {
    if (question) {
      outputs.question(question);
    }
    return inputs.pop();
  };

  return linebyline(inputs, ask, entry);
};
