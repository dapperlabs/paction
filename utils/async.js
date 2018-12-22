exports.sequential = async (f, items) => {
  const go = async (f, all, items, i) => {
    if (i >= items.length) {
      return all;
    }

    const one = items[i];
    const value = await f(one);
    all.push(value);
    return go(f, all, items, i + 1);
  };
  return go(f, [], items, 0);
};
