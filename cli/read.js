const readline = require('readline');

exports.linebyline = (pubsub, ask, run) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', (input) => {
    pubsub.push(input);
  });

  run(ask).then(() => {
    rl.close();
  });
};
