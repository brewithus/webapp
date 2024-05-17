import { yelpApiClient } from '@/config/yelp';
import type { YelpBiz } from '@/types/yelp';

export const searchCafes = async (
  lat: number,
  long: number,
  userQuery: string,
  categories: string[] = ['coffee', 'tea', 'bubbletea'],
  openNow: boolean = false,
): Promise<YelpBiz[]> => {
  let url = `businesses/search?latitude=${lat}&longitude=${long}&term=${userQuery}&locale=en_US`;
  categories.forEach((category) => {
    url += `&categories=${category}`;
  });

  if (openNow) {
    url += '&open_now=true';
  }

  url += '&sort_by=best_match&limit=20';

  try {
    const response = await yelpApiClient.get(url);

    return response.data.businesses as YelpBiz[];
  } catch (e) {
    throw Error('[Yelp error] search biz failed');
  }
};
