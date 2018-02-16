const a = 'àáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ';
const aA = 'ÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛÑÇSSŸŒÆŔŚŃṔẂǴǸḾǗẌŹḦ';
const b = 'aaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh';
const bB = 'AAAAEEEEIIIIOOOOUUUUNCSYOARSNPWGNMUXZH';
const regex = new RegExp(a.split('').join('|'), 'g');

export const searchQuery = obj => Object.keys(obj)
  .reduce((acc, key) => {
    const value = obj[key].toString()
      .replace(/\s+/g, '+') // replace all spaces by '+' sign
      .replace(regex, char => b.charAt(a.indexOf(char)))
      .replace(regex, char => bB.charAt(aA.indexOf(char)));
    return acc.concat([`${key}=${encodeURI(value)}`]);
  }, []).join('&');

export default searchQuery;
