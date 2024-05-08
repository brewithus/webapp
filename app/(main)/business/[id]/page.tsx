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
import { Bookmark, Dot, Share, Star } from 'lucide-react';
import DisplayAttributes from '../../_components/display-attributes';
import BizImages from '../../_components/biz-images';
import { Skeleton } from '@/components/ui/skeleton';
import BrewReviews from '../../_components/brew-biz-reviews';
import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import { googleSignInPopup } from '@/config/firebase';
import { updateUserPreferences } from '@/hooks/firebase/user-biz-interact';
import { toast } from 'sonner';
import { useBizInfo } from '@/hooks/firebase/biz';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import ShareOnTwitter from '@/components/share-able/twitter';
import CopyToClipboard from '@/components/custom-ui/copy-to-clipboard';

interface PageProps {
  /**
   * The parameters passed to the page, including the id of the store.
   */
  params: {
    id: string;
  };
}

const Page: NextPage<PageProps> = ({ params }: PageProps): JSX.Element => {
  const { data: biz, isLoading } = useBizInfo(params.id);
  const { user, userPreferences, setPreferences } = useUser();

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

  const userFollowed = (): boolean => {
    return (userPreferences?.followed ?? []).includes(biz.id);
  };

  const userSaved = (): boolean => {
    return (userPreferences?.saved ?? []).includes(biz.id);
  };

  const handleSave = (): void => {
    if (!user) {
      googleSignInPopup();
      return;
    }
    updateUserPreferences(user.uid, {
      saved: userSaved()
        ? userPreferences?.saved?.filter((s) => s !== biz.id) ?? []
        : [...(userPreferences?.saved ?? []), biz.id],
    })
      .then((data) => {
        setPreferences(data);
      })
      .catch((e) => {
        toast.error('Unexpected error');
      });
  };

  const handleFollow = (): void => {
    if (!user) {
      googleSignInPopup();
      return;
    }
    updateUserPreferences(user.uid, {
      followed: userFollowed()
        ? userPreferences?.followed?.filter((s) => s !== biz.id) ?? []
        : [...(userPreferences?.followed ?? []), biz.id],
    })
      .then((data) => {
        setPreferences(data);
      })
      .catch((e) => {
        toast.error('Unexpected error');
      });
  };

  // Directly use coffeeShop.menuItems and coffeeShop.reviews
  return (
    <div className="flex flex-col items-center mb-2">
      <div className="w-full flex flex-col items-center gap-4 pb-8">
        {/* Coffee Shop Image */}
        <div className="relative h-[400px] justify-center bg-primary-light dark:bg-primary-dark">
          {/* images */}
          <BizImages images={biz.photos} />
          {/* Overlay Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col items-center gap-1 bg-gradient-to-t from-black/90 from-10% text-white justify-end">
            <div className="flex flex-col gap-1 max-w-[1024px] w-full">
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
                    className="text-primary"
                  />
                )}
                <span>{biz.rating}</span>
                <span>({biz.review_count} yelp reviews)</span>
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
              <div className="flex items-center flex-wrap gap-3 mt-2">
                <OpeningTime hours={biz.hours} coordinates={biz.coordinates} />
                <a
                  href="#location-&-hours"
                  className="px-2 py-1 text-black/80 bg-white/50 text-xs font-semibold rounded-xl"
                >
                  See hours
                </a>
              </div>
              {/* Action Buttons */}
            </div>
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 max-w-[1024px]">
          <div className="flex items-center gap-2 flex-wrap my-2 mx-4">
            <Popover>
              <PopoverTrigger>
                <Button className="font-semibold gap-2" variant={'outline'}>
                  <Share size={20} />
                  Share
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start">
                <div className="flex flex-col min-w-[100px] gap-1">
                  <div className="flex items-center gap-1 p-2 text-xs bg-primary/10 rounded-md cursor-pointer">
                    <span className="truncate text-foreground/50 font-semibold">{`https://brewith.us/business/${biz.id}`}</span>
                    <span className="p-1 rounded-sm hover:bg-primary/30">
                      <CopyToClipboard
                        text={`https://brewith.us/business/${biz.id}`}
                      />
                    </span>
                  </div>
                  <Separator />
                  <ShareOnTwitter
                    url={`https://brewith.us/business/${biz.id}`}
                    text={`Checkout this business on Brewithus: ${biz.name}!`}
                  />
                </div>
              </PopoverContent>
            </Popover>

            <Button
              className="font-semibold gap-2"
              variant={userSaved() ? 'default' : 'outline'}
              onClick={handleSave}
            >
              <Bookmark size={20} />
              Save{userSaved() && 'd'}
            </Button>
            <Button
              className="font-semibold gap-2"
              variant={userFollowed() ? 'default' : 'outline'}
              onClick={handleFollow}
            >
              <Star size={20} />
              Follow{userFollowed() && 'ed'}
            </Button>
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
          {(biz.attributes.about_this_biz_specialties ??
            biz.attributes.about_this_biz_history) && (
            <Section title="About the Business" className="flex flex-col gap-4">
              {biz.attributes.about_this_biz_specialties && (
                <div className="flex flex-col gap-2">
                  <div className="font-bold text-lg">Specialties</div>
                  <p className="text-foreground/70">
                    {biz.attributes.about_this_biz_specialties}
                  </p>
                </div>
              )}
              {biz.attributes.about_this_biz_history && (
                <div className="flex flex-col gap-2">
                  <div className="font-bold text-lg">History</div>
                  <p className="text-foreground/70">
                    {biz.attributes.about_this_biz_history}
                  </p>
                </div>
              )}
            </Section>
          )}
          {/* Review Section */}
          <Section title="Brew Reviews" className="flex flex-col gap-4">
            <BrewReviews bizID={biz.id} bizName={biz.name} />
          </Section>
        </div>
      </div>
    </div>
  );
};

export default Page;
