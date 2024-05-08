'use client';
import type { NextPage } from 'next';
import React from 'react';
import Locations from '../../_components/location-and-hours';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import DisplayReviewStars from '../../_components/stars';
import { rubikFont } from '@/styles/fonts';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import OpeningTime from '../../_components/opening-time';
import Section from '../../_components/section';
import { Dot } from 'lucide-react';
import DisplayAttributes from '../../_components/display-attributes';
import BizImages from '../../_components/biz-images';
import { useBusinessDetails } from '@/hooks/api/get-biz-details';
import { Skeleton } from '@/components/ui/skeleton';

interface PageProps {
  /**
   * The parameters passed to the page, including the id of the store.
   */
  params: {
    id: string;
  };
}

const Page: NextPage<PageProps> = ({ params }: PageProps): JSX.Element => {
  const { data: biz, isLoading } = useBusinessDetails(params.id);

  if (isLoading) {
    return (
      <div className="p-8 flex flex-col gap-4">
        <Skeleton className="h-[40vh] w-full rounded-lg" />
        <Skeleton className="h-[100px] w-full rounded-lg" />
        <Skeleton className="h-[100px] w-full rounded-lg" />
        <Skeleton className="h-[100px] w-full rounded-lg" />
      </div>
    );
  }

  if (!biz) {
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
      <div className="w-full max-w-[1028px] flex flex-col gap-4 pb-8">
        {/* Coffee Shop Image */}
        <div
          className="relative h-[400px] justify-center bg-primary-light dark:bg-primary-dark"
          // style={{
          //   backgroundImage: `url('${biz.image_url}')`,
          //   backgroundSize: 'cover', // Cover the entire section
          //   backgroundPosition: 'center', // Center the background image
          //   backgroundRepeat: 'no-repeat', // Do not repeat the image
          // }}
        >
          {/* images */}
          <BizImages images={biz.photos} />
          {/* Overlay Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 w-fit rounded-tr-lg flex flex-col gap-1 bg-black/50  text-white">
            <div className={cn('text-4xl font-bold', rubikFont.className)}>
              {biz.name}
            </div>
            {/* Rating and Review Section */}
            <div className="text-lg font-medium flex items-center gap-2">
              <span className="font-bold text-white">{biz.price}</span>
              <Dot />
              {biz.rating && (
                <DisplayReviewStars
                  rating={biz.rating}
                  className="text-primary-dark"
                />
              )}
              <span>{biz.rating}</span>
              <span>({biz.review_count} reviews)</span>
            </div>
            {/* Categories */}
            <div className="flex flex-wrap gap-1">
              {biz.categories.map((tag, index) => (
                <Badge key={index} variant={'default'}>
                  {tag.title}
                </Badge>
              ))}
            </div>
            {/* Status and Hours */}
            <OpeningTime hours={biz.hours} coordinates={biz.coordinates} />
            {/* Action Buttons */}
          </div>
        </div>
        <Section title="Amenities & More">
          <DisplayAttributes attributes={biz.attributes} />
        </Section>
        <Section title="Location & Hours">
          <Locations
            id={params.id}
            address={biz.location.display_address}
            hours={biz.hours}
            phone={biz.display_phone}
            location={{
              lat: biz.coordinates.latitude,
              lng: biz.coordinates.longitude,
            }}
          />
        </Section>
        <Section title="About the Business" className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="font-bold text-lg">Specialties</div>
            <p className="text-foreground/70">
              {biz.attributes.about_this_biz_specialties}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="font-bold text-lg">History</div>
            <p className="text-foreground/70">
              {biz.attributes.about_this_biz_history}
            </p>
          </div>
        </Section>
        {/* Review Section */}
        {/* <ReviewSection reviews={biz.reviews ?? []} /> */}
      </div>
    </div>
  );
};

export default Page;
