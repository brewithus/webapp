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
      <div className="flex flex-col gap-4 p-8">
        <Skeleton className="h-[40vh] w-full rounded-lg" />
        <Skeleton className="h-[100px] w-full rounded-lg" />
        <Skeleton className="h-[100px] w-full rounded-lg" />
        <Skeleton className="h-[100px] w-full rounded-lg" />
      </div>
    );
  }

  if (!biz) {
    return (
      <div className="flex h-full min-h-[300px] items-center justify-center py-[20vh]">
        <div className="flex h-24 flex-row items-center justify-center gap-8 rounded-lg border p-4">
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
    <div className="mb-2 flex flex-col items-center">
      <div className="flex w-full flex-col items-center gap-4 pb-8">
        {/* Coffee Shop Image */}
        <div className="relative h-[400px] justify-center bg-primary-light dark:bg-primary-dark">
          {/* images */}
          <BizImages images={biz.photos ?? [biz.image_url]} />
          {/* Overlay Info */}
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center justify-end gap-1 bg-gradient-to-t from-black/90 from-10% p-4 text-white">
            <div className="flex w-full max-w-[1024px] flex-col gap-1">
              <div className={cn('text-4xl font-bold', rubikFont.className)}>
                {biz.name}
              </div>
              {/* Rating and Review Section */}
              <div className="flex items-center gap-2 text-lg font-medium">
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
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <OpeningTime hours={biz.hours} coordinates={biz.coordinates} />
                <a
                  href="#location-&-hours"
                  className="rounded-xl bg-white/50 px-2 py-1 text-xs font-semibold text-black/80"
                >
                  See hours
                </a>
              </div>
              {/* Action Buttons */}
            </div>
          </div>
        </div>
        <div className="flex w-full max-w-[1024px] flex-col gap-4">
          <div className="mx-4 my-2 flex flex-wrap items-center gap-2">
            <Popover>
              <PopoverTrigger>
                <Button className="gap-2 font-semibold" variant={'outline'}>
                  <Share size={20} />
                  Share
                </Button>
              </PopoverTrigger>
              <PopoverContent align="start">
                <div className="flex min-w-[100px] flex-col gap-1">
                  <div className="flex cursor-pointer items-center gap-1 rounded-md bg-primary/10 p-2 text-xs">
                    <span className="truncate font-semibold text-foreground/50">{`https://brewith.us/business/${biz.id}`}</span>
                    <span className="rounded-sm p-1 hover:bg-primary/30">
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
              className="gap-2 font-semibold"
              variant={userSaved() ? 'default' : 'outline'}
              onClick={handleSave}
            >
              <Bookmark size={20} />
              Save{userSaved() && 'd'}
            </Button>
            <Button
              className="gap-2 font-semibold"
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
                  <div className="text-lg font-bold">Specialties</div>
                  <p className="text-foreground/70">
                    {biz.attributes.about_this_biz_specialties}
                  </p>
                </div>
              )}
              {biz.attributes.about_this_biz_history && (
                <div className="flex flex-col gap-2">
                  <div className="text-lg font-bold">History</div>
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
