// application
import { slugify } from './../lib/slugify';
import { groupby } from './../lib/groupby';

export const getSearchResults = (state) => {
  const grouped = groupby(state.results, 'artistName');
  return Object
    .keys(grouped)
    .map(name => ({
      name,
      key: slugify(name),
      podcasts: grouped[name],
      count: grouped[name].length,
    }));
};

export default getSearchResults;
