const assert = require('assert');
const flows = require('../flows');
const { readByName } = require('./cases');
const { answerWithInputs } = require('./util');

describe('transferEther', () => {
  it('should transfer', async () => {
    const { inputs, output_json } = readByName('transferEther');
    const ask = answerWithInputs(inputs);
    const answer = await flows.entry(ask);
    const answer_json = JSON.parse(answer);
    assert.deepEqual(answer_json, output_json);
  });
});
