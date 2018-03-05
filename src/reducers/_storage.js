// see system/node-context.js
export const createStorage = (opts) => {
  const store = window.NodeContext.createStore(opts);
  return {
    getItem: (key) => {
      const value = store.get(key);
      return new Promise(resolve => resolve(value));
    },
    setItem: (key, item) => {
      const value = JSON.parse(item);
      return new Promise(resolve => resolve(store.set(key, value)));
    },
    removeItem: key => new Promise(resolve => resolve(store.delete(key))),
    getAllKeys: () => new Promise(resolve => resolve(store.store())),
  };
};

export default createStorage;
