const fs = require('fs');
const path = require('path');
const { isHex0x } = require('../utils/hex');
const { findMethod } = require('./abi');
const { isValidAddress } = require('ethereumjs-util');

// string -> [string] -> string
exports.chooseOneOf = (name, choices) => {
  const options = choices
    .map((item, index) => {
      return `${index + 1}. ${item}`;
    })
    .join('\n');
  const count = options.length;
  return {
    question: `Please choose one of the following ${name}:\n${options}`,
    validator: (answer) => {
      const a = parseInt(answer, 10);
      const valid = a > 0 && a <= count;
      return [valid, a];
    },
  };
};

exports.address = (question) => {
  return {
    question: question,
    validator: (answer) => {
      const valid = isValidAddress(answer);
      return [valid, answer];
    },
  };
};

exports.nonNegativeNumber = (question) => {
  return {
    question: question,
    validator: (answer) => {
      const n = parseInt(answer, 10);
      const valid = n >= 0;
      return [valid, n];
    },
  };
};

exports.nonce = exports.nonNegativeNumber;

exports.abiPath = (question) => {
  return {
    question: question,
    validator: (answer) => {
      // relative path to pwd
      const abiFilePath = path.resolve(answer);
      const abiFile = fs.readFileSync(abiFilePath, 'utf8');
      try {
        const json = JSON.parse(abiFile);
        return [true, json];
      } catch (e) {
        e.message = `Failed to parse json at FilePath: ${abiFilePath}. Because: ${e.message}`;
        throw e;
      }
    },
  };
};

exports.typeOneOf = (question, choices) => {
  return {
    question: question,
    validator: (answer) => {
      const choice = choices.indexof(answer) + 1;
      const valid = choice > 0;
      return [valid, choice];
    },
  };
};

exports.bignumber = (question) => {
  return {
    question: question,
    validator: (answer) => {
      const valid = /^\d+$/.test(answer);
      return [valid, answer];
    },
  };
};

exports.bool = (question) => {
  return {
    question: question,
    validator: (answer) => {
      const valid = answer === 'y' || answer === 'n';
      return [valid, answer === 'y'];
    },
  };
};

exports.hex0x = (question) => {
  return {
    question: question,
    validator: (answer) => {
      const valid = isHex0x(answer);
      return [valid, answer];
    },
  };
};

exports.methodName = (abiJSON, question) => {
  return {
    question,
    validator: (methodName) => {
      const method = findMethod(abiJSON, methodName);
      return [!!method, method];
    },
  };
};
