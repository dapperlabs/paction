const { hexToBuffer } = require('../utils/hex');

// https://gist.github.com/bas-vk/d46d83da2b2b4721efb0907aecdb7ebd
// alias signature = { r: Buffer, s: Buffer, v: Buffer }
// hex0x -> signature
exports.fromHex0x = (signature) => {
  const sig = signature.substr(2);
  const r = hexToBuffer(sig.substr(0, 64));
  const s = hexToBuffer(sig.substr(64, 64));
  const v = hexToBuffer(sig.substr(128, 2));
  return { r, s, v };
};
