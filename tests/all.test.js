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

describe('1. transferEther', () => {
  it('1 - should transfer when send to the geth node to sign and send', async () => {
    await assertCaseByName('transferEther_signByGethAndSend');
  });

  it('4 - should transfer with provided private key', async () => {
    await assertCaseByName('transferEther_providedKey');
  });

  it('5 - should transfer and show payload', async () => {
    await assertCaseByName('transferEther_genPayload');
  });
});

describe('2. deployContract', () => {
  it('4 - should deploy with provided private key', async () => {
    await assertCaseByName('deployContract_signByKey');
  });
});

describe('3. callMethod', () => {
  it('4 - should call method with provided private key', async () => {
    await assertCaseByName('callMethod_signByKey');
  });
});

describe('4. readContract', () => {
  it('should read contract', async () => {
    await assertCaseByName('readContract');
  });
});

describe('5. queryNonce', () => {
  it('should query nonce', async () => {
    await assertCaseByName('queryNonce');
  });
});

describe('6. readTransactionData', () => {
  it('should read transaction data', async () => {
    await assertCaseByName('readTransactionData');
  });
});

describe('support comments', () => {
  it('should ignore comments', async () => {
    await assertCaseByName('transferEther_genPayload_comments');
  });
  it('should ignore multi line comments', async () => {
    await assertCaseByName('transferEther_genPayload_multi_comments');
  });
});
