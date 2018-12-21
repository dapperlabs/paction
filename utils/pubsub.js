// () -> pubsub
exports.init = () => {
  return { queue: [], demanding: null };
};

// pubsub -> item -> pubsub
exports.push = (pubsub, item) => {
  if (pubsub.queue.length === 0 && !!pubsub.demanding) {
    pubsub.demanding(item);
    pubsub.demanding = null;
  } else {
    pubsub.queue.push(item);
  }
  return pubsub;
};

// pubsub -> Promise item
exports.pop = (pubsub) => {
  return new Promise((resolve) => {
    if (pubsub.queue.length) {
      resolve(pubsub.queue.shift());
      pubsub.demanding = null;
    } else {
      pubsub.demanding = resolve;
    }
  });
};

exports.singleton = () => {
  const state = exports.init();
  return {
    push: (item) => {
      return exports.push(state, item);
    },
    pop: () => {
      return exports.pop(state);
    },
  };
};
