const { toRLP } = require('../ethereum/transaction');

exports.ledger = (rawTx) => {
  const rawTxHex = toRLP(rawTx);
  return rawTxHex;
};
