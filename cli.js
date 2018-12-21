const { entry } = require('./flows');
const { linebyline } = require('./cli/read');
const Pubsub = require('./utils/pubsub');

exports.start = () => {
  const pubsub = Pubsub.singleton();

  const ask = (question) => {
    console.log(); // insert empty line
    console.log(question);
    return pubsub.pop();
  };

  return linebyline(pubsub, ask, entry);
};
