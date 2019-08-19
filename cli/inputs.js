const path = require('path');
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
      // relative path to cwd
      const json = require(path.resolve(answer));
      return [true, json];
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
