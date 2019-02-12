const fs = require('fs');
const path = require('path');

// string -> { inputs: [string], outputs: string }
exports.readByName = (name) => {
  const inputsFile = fs.readFileSync(path.resolve(__dirname, `cases/${name}.inputs`), 'utf8');
  const inputs = inputsFile.split('\n');
  const outputs = fs.readFileSync(path.resolve(__dirname, `cases/${name}.outputs`), 'utf8');
  const output_json = JSON.parse(outputs);
  return { inputs, outputs, output_json: output_json };
};

