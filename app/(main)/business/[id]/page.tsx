import type { NextPage } from 'next';
import React from 'react';
import ProductList from '../_components/menu';
import Locations from '../_components/location-and-hours';
import ReviewSection from '../_components/reviews';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { type Business } from '../_types';
import { mockBusiness } from '../_mock_data/cofeeShopData';
import DisplayReviewStars from '../_components/stars';
import { poppinsFont, rubikFont } from '@/styles/fonts';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

interface PageProps {
  /**
   * The parameters passed to the page, including the id of the store.
   */
  params: {
    id: string;
  };
}

const findCoffeeShop = (id: string): Business | undefined => {
  return mockBusiness.find((shop) => shop.id === id);
};

const Page: NextPage<PageProps> = ({ params }: PageProps): JSX.Element => {
  const coffeeShop = findCoffeeShop(params.id);

  if (!coffeeShop) {
    return (
      <div className="flex items-center justify-center h-full py-[20vh] min-h-[300px]">
        <div className="flex flex-row h-24 gap-8 items-center justify-center p-4 border rounded-lg">
          <h2 className="text-3xl">404</h2>
          <Separator orientation="vertical" />
          <div className="flex flex-col items-center justify-center gap-3">
            <p>Could not find requested resource</p>
            <Link
              href="/"
              className="rounded-lg bg-secondary px-3 py-2 hover:bg-secondary/90"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Directly use coffeeShop.menuItems and coffeeShop.reviews
  return (
    <div className="flex flex-col items-center mb-2">
      <div className="w-full max-w-[1028px] flex flex-col gap-4">
        {/* Coffee Shop Image */}
        <div
          className="relative h-[40vh] min-h-[300px] max-h-[500px] justify-center bg-primary-light dark:bg-primary-dark"
          style={{
            backgroundImage: `url('${coffeeShop.picture}')`,
            backgroundSize: 'cover', // Cover the entire section
            backgroundPosition: 'center', // Center the background image
            backgroundRepeat: 'no-repeat', // Do not repeat the image
          }}
        >
          {/* Overlay Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 w-fit rounded-tr-lg flex flex-col gap-1 bg-black/50  text-white">
            <div className={cn('text-4xl font-bold', rubikFont.className)}>
              {coffeeShop.name}
            </div>
            {/* Rating and Review Section */}
            <div className="text-2xl flex items-center gap-2">
              {coffeeShop.rating && (
                <DisplayReviewStars
                  rating={coffeeShop.rating}
                  className="text-primary-dark"
                />
              )}
              <span className="text-lg font-medium">{` (${coffeeShop.reviewCount} reviews)`}</span>
            </div>
            {/* Categories */}
            <div className="flex flex-wrap gap-1">
              {coffeeShop.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant={'default'}
                  // style={{ marginRight: '10px', display: 'inline-block' }}
                >
                  {tag}
                </Badge>
              ))}
            </div>
            {/* Status and Hours */}
            <div
              className={cn(
                'font-medium flex items-center gap-2 mt-2',
                poppinsFont.className,
              )}
            >
              <Badge className="text-md bg-primary/50">
                {coffeeShop.status}
              </Badge>
              <span>{coffeeShop.hours}</span>
            </div>
            {/* Action Buttons */}
          </div>
        </div>
        <ProductList items={coffeeShop.menuItems} />
        <Locations
          id={params.id}
          address={coffeeShop.address}
          hours={coffeeShop.hours}
          phone="+1 234 567 8900"
          location={{
            lat: coffeeShop.location.latitude,
            lng: coffeeShop.location.longitude,
          }}
        />

        {/* Review Section */}
        <ReviewSection reviews={coffeeShop.reviews ?? []} />
      </div>
    </div>
  );
};

export default Page;
