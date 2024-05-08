import { apiClient } from '@/config/api';
import type { YelpBizDetails } from '@/types/yelp';
import { type UseQueryResult, useQuery } from 'react-query';

const ONE_HOUR_IN_MS = 1000 * 60 * 60; // 1 hour in milliseconds

export const useBusinessDetails = (
  businessId: string,
): UseQueryResult<YelpBizDetails, Error> => {
  return useQuery<YelpBizDetails, Error>(
    ['business', businessId],
    async () => {
      const { data } = await apiClient.get<YelpBizDetails>(
        `/business/${businessId}`,
      );
      return data;
    },
    {
      staleTime: ONE_HOUR_IN_MS, // Data will be considered stale after 1 hour
      cacheTime: ONE_HOUR_IN_MS, // Cache will be invalidated after 1 hour
    },
  );
};
