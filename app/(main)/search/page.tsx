'use client';
import React from 'react';
import type { NextPage } from 'next';
import { apiClient } from '@/config/api';
import type { YelpBiz } from '@/types/yelp';
import { toast } from 'sonner';
import BizSearchResultCard from './_components/biz-card';
import { Separator } from '@/components/ui/separator';
import MapResults from './_components/maps-results';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Represents the properties of the Page component.
 */
interface PageProps {
  /**
   * the search parameters passed to the page
   */
  searchParams: Record<string, string>;
}

/**
 * Search Params Page Component
 *
 * This component demonstrates how to use search parameters to filter or display content dynamically.
 * It expects `searchParams` as a prop, specifically looking for `tags` and coordinates parameters to display.
 * If `tags` are provided, they are displayed as badges; if not, a default message is shown. The `address`
 * is shown directly, with a fallback message if not provided.
 * @param {PageProps} searchParams the search parameters passed to the page
 * @returns {JSX.Element} The JSX for the business search page or a redirection effect.
 */
const Page: NextPage<PageProps> = ({
  searchParams,
}: PageProps): JSX.Element => {
  // Check if 'tags' param exists and is not just whitespace
  const tagsExistAndNotEmpty = searchParams.tags?.trim();

  // If 'tags' param exists, split into array, else default to empty array
  const tags = tagsExistAndNotEmpty
    ? searchParams.tags
        .trim()
        .split(',')
        .filter((tag) => tag !== '')
    : [];

  const [bizList, setBizList] = React.useState<YelpBiz[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(
    () => {
      setIsLoading(true);
      const fetchData = async (): Promise<{ businesses: YelpBiz[] }> => {
        const q = tags.join(','); // Combine tags with a comma separator
        const lng = searchParams.lng || '';
        const lat = searchParams.lat || '';
        if (!q || !lng || !lat) {
          throw Error('Invalid request');
        }

        const response = await apiClient.get<{ businesses: YelpBiz[] }>(
          `/business?q=${encodeURIComponent(q)}&lng=${lng}&lat=${lat}`,
        );

        // Handle the API response data as needed
        return response.data;
      };
      // setBizList(sampleCafes);
      fetchData()
        .then((data) => {
          setBizList(data.businesses);
          toast.success('loaded');
        })
        .catch((e) => {
          // console.error('error fetching data', e);
          // toast.error('an error happened');
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  if (!searchParams.lat || !searchParams.lng) {
    return (
      <div className="w-full">
        <Skeleton className="w-full h-12" />
      </div>
    );
  }
  return (
    <div className="p-4">
      {/* <div className="flex flex-row gap-2">
        <span>Address:</span>
        <span className="font-bold">
          {searchParams.lat}
          {searchParams.lng}
        </span>
      </div>
      <div className="flex flex-row gap-2">
        Tags:
        <span className="font-bold flex flex-row gap-2">
          {tags.length === 0
            ? 'No tags selected'
            : tags.map((tag, index) => <Badge key={index}>{tag}</Badge>)}
        </span>
      </div> */}
      <div className="w-full flex flex-col-reverse lg:flex-row gap-3">
        <div className="flex-1 mt-4 flex flex-col gap-4 max-w-5xl">
          <div className="text-xl font-semibold">Search Results</div>
          {bizList.length === 0 && (
            <div className="font-medium text-foreground/50">No biz yet..</div>
          )}
          <div className="flex flex-col">
            {bizList.map((biz, index) => (
              <div key={index} className="flex flex-col">
                <BizSearchResultCard key={index} biz={biz} />
                <Separator />
              </div>
            ))}
          </div>
        </div>
        <div className="flex-none w-full lg:w-[500px] h-[30dvh] lg:h-[100dvh]">
          <MapResults
            position={{
              lat: Number(searchParams.lat),
              lng: Number(searchParams.lng),
            }}
            bizList={bizList}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
