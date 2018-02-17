const pattern = /^(?:\w+:)?\/\/([^\s.]+\.\S{2}|localhost[:?\d]*)\S*$/;

export const isurl = str => pattern.test(str);

export default isurl;
