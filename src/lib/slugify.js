export const slugify = (text) => {
  const a = 'àáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;';
  const b = 'aaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------';
  const p = new RegExp(a.split('').join('|'), 'g');
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(p, c => b.charAt(a.indexOf(c)))
    .replace(/&/g, '-and-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

export default slugify;
