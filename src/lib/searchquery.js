const aA = 'ÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛÑÇSSŸŒÆŔŚŃṔẂǴǸḾǗẌŹḦ';
const bB = 'AAAAEEEEIIIIOOOOUUUUNCSYOARSNPWGNMUXZH';
const a = 'àáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ';
const b = 'aaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh';
const regex = new RegExp(a.split('').join('|'), 'g');

export const searchQuery = obj =>
  Object.keys(obj)
    .reduce((acc, key) => {
      const value = obj[key]
        .toString()
        // replace all spaces by '+' sign
        .replace(/\s+/g, '+')
        // replace accent
        .replace(regex, char => b.charAt(a.indexOf(char)))
        .replace(regex, char => bB.charAt(aA.indexOf(char)));
      // encode URL
      return acc.concat([`${key}=${encodeURI(value)}`]);
    }, [])
    .join('&');

export default searchQuery;
