export const pick = (obj, props) => Object.keys(obj)
  .filter(key => props.includes(key))
  .reduce((acc, key) => Object.assign(acc, { [key]: obj[key] }), {});

export default pick;
