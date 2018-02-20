export const groupby = (collection, objkey) => collection.reduce((acc, obj) => {
  const keyvalue = obj[objkey];
  return Object.assign({}, acc, { [keyvalue]: (acc[keyvalue] || []).concat([obj]) });
}, {});

export default groupby;
