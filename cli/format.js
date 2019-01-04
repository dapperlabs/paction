const untilValid = async (ask, answer, validator) => {
  if (!answer)  {
    const another = await ask();
    return untilValid(ask, another, validator);
  }
  const [valid, value] = validator(answer);
  if (valid) {
    return Promise.resolve(value);
  }
  const another = await ask('Invalid value, try again');
  return untilValid(ask, another, validator);
};

exports.askUntilValid = async (ask, inputs) => {
  const answer = await ask(inputs.question);
  return untilValid(ask, answer, inputs.validator);
};
