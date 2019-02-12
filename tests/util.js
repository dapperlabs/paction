const sinon = require('sinon');
const outputs = require('../cli/outputs');

exports.stubOutputAnwser = () => {
  return sinon.stub(outputs, 'answer');
};

exports.answerWithInputs = (inputs) => {
  let index = -1;
  return async () => {
    index++;
    const answer = inputs[index];
    return answer;
  };
};
