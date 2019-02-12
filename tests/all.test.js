const assert = require('assert');
const flows = require('../flows');
const { readByName } = require('./cases');
const { answerWithInputs } = require('./util');

const assertCaseByName = async (name) => {
  const { inputs, output_json } = readByName(name);
  const ask = answerWithInputs(inputs);
  const answer = await flows.entry(ask);
  const answer_json = JSON.parse(answer);
  assert.deepEqual(answer_json, output_json);
};

describe('1 transferEther', () => {
  it('1 - should transfer when send to the geth node to sign and send', () => {
    return assertCaseByName('transferEther_signByGethAndSend');
  });

  it('4 - should transfer with provided private key', () => {
    return assertCaseByName('transferEther_providedKey');
  });

  it('5 - should transfer and show payload', () => {
    return assertCaseByName('transferEther_genPayload');
  });
});
