import { yelpApiClient } from '@/config/yelp';
import type { YelpBizDetails } from '@/types/yelp';

export const findYelpBizDetails = async (
  id: string,
): Promise<YelpBizDetails> => {
  const url = `businesses/${id}`;

  try {
    const response = await yelpApiClient.get(url);

    return response.data as YelpBizDetails;
  } catch (e) {
    console.log('error searching biz', e);
    throw Error('[Yelp error] search biz failed');
  }
};
