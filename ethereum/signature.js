const { hexToHex0x } = require('../utils/hex');

// https://gist.github.com/bas-vk/d46d83da2b2b4721efb0907aecdb7ebd
// alias signature = { r: hex0x, s: hex0x, v: hex0x }
// hex0x -> signature
exports.fromHex0x = (signature) => {
  const sig = signature.substr(2);
  const r = hexToHex0x(sig.substr(0, 64));
  const s = hexToHex0x(sig.substr(64, 64));
  const v = hexToHex0x(sig.substr(128, 2));
  return { r, s, v };
};
