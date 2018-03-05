// see system/node-context.js
export const createStorage = (presistkey, opts) => {
  const store = window.NodeContext.createStore(opts);
  return {
    getItem: (key) => {
      const value = store.get(key);
      // console.log('value', value);
      // value = JSON.stringify(value, (pkey, pvalue) => {
      //   try {
      //     return JSON.stringify(pvalue);
      //   } catch (e) {
      //     return pvalue;
      //   }
      // });
      return new Promise(resolve => resolve(value));
    },
    setItem: (key, item) =>
      // const value = JSON.parse(item, (pkey, pvalue) => {
      //   try {
      //     return JSON.parse(pvalue);
      //   } catch (e) {
      //     return pvalue;
      //   }
      // });
      new Promise(resolve => resolve(store.set(key, item))),
    removeItem: key => new Promise(resolve => resolve(store.delete(key))),
    getAllKeys: () => new Promise(resolve => resolve(store.store())),
  };
};

export default createStorage;
