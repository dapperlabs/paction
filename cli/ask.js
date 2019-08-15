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
  let answer = await ask(inputs.question);
  // If the line starts with `#`, it will be treated as a comment, and
  // ignored.
  if (answer[0] === '#') {
    answer = await ask('');
  }
  return untilValid(ask, answer, inputs.validator);
};
