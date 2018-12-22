const copy = (json) => {
  return JSON.parse(JSON.stringify(json));
};

exports.sequential = async (f, items) => {
  const go = async (f, all, items) => {
    if (items.length === 0) {
      return all;
    }

    const one = items.shift();
    const value = await f(one);
    all.push(value);
    return go(f, all, items);
  };
  // TODO: avoid copy
  return go(f, [], copy(items));
};
