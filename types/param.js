// { name: 'ids', type: 'uint256[]' }
exports.isArray = (param) => {
  return param.type.indexOf('[]') >= 0;
};

exports.toInputs = (param) => {
  return {
    question: exports.toQuestion(param),
    validator: exports.toValidator(param),
  };
};

exports.toQuestion = (param) => {
  const isArr = exports.isArray(param);
  const extraIntro = isArr ? ' (please use "," to separate array items):' : '';
  return `Please type the function argument of "${param.name} (${
    param.type
  })"${extraIntro}`;
};

exports.toValidator = (param) => {
  return (answer) => {
    const { type } = param;
    if (type === 'bool') {
      return [(answer) => answer === 'true' || answer === 'false', answer === 'true'];
    } else if (exports.isArray(param)) {
      return [true, answer.split(',')];
    } else if (type.substr(0, 5) === 'bytes') {
      return [answer.substr(0, 2) === '0x', answer];
    }
    return [true, answer];
  };
};
