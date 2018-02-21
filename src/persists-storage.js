// see system/node-context.js
export const createStorage = (opts) => {
  const store = window.NodeContext.createStore(opts);
  return {
    getItem: key =>
      new Promise(resolve => resolve(store.get(key))),
    setItem: (key, item) =>
      new Promise(resolve => resolve(store.set(key, item))),
    removeItem: key =>
      new Promise(resolve => resolve(store.delete(key))),
    getAllKeys: () =>
      new Promise(resolve => resolve(store.store())),
  };
};

export default createStorage;
