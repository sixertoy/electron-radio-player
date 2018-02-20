/*
export const addStation = url => ({
  type: 'onAddStation',
  item: {
    url,
    type: 'radio',
    name: 'abstract name',
    key: '@abstractkey',
    website: 'https://www.fip.fr/player',
    cover: {
      color: '#E2007A',
      background: '#E2007A',
      logo: `
        https://upload.wikimedia.org/wikipedia/fr/thumb/d/d5/FIP_logo_2005.svg/1200px-FIP_logo_2005.svg.png
      `,
    },
  },
});
*/

export const commitStation = item => ({
  item,
  type: 'onCommitForm',
});

export const createStation = (uri, type) => ({
  type: 'onCreateForm',
  item: { uri, type },
});

export const removeStation = item => ({
  item,
  type: 'onRemoveStation',
});

export const subscribe = podcast => ({
  podcast,
  type: 'onSubscribeToPodcast',
});
