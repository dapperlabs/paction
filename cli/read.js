const readline = require('readline');

exports.linebyline = async (pubsub, ask, run) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on('line', (input) => {
    pubsub.push(input);
  });

  try {
    await run(ask);
  } catch (e) {
    console.error('Fatal Error:', e);
  } finally {
    rl.close();
  }
};
