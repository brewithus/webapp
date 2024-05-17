'use client';

import type { BrewReview } from '@/types/brew';
import React, { useEffect, useRef } from 'react';

import Image from 'next/image';
import DisplayReviewStars from '@/app/(main)/_components/stars';
import { formatDistanceToNowStrict } from 'date-fns';
import { cn } from '@/lib/utils';
import { FaEllipsisV } from 'react-icons/fa';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import ShareOnTwitter from '../share-able/twitter';
import { useRouter } from 'next/navigation';

interface Props {
  bizName: string;
  reviews: BrewReview[];
}

const BrewReviews: React.FC<Props> = ({ reviews, bizName }) => {
  const reviewRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [highlightingRef, setHighlightingRef] = React.useState(false);
  const router = useRouter();

  useEffect(() => {
    // Function to perform the scroll if the element exists
    const scrollToElement = (): void => {
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        const reviewEl = reviewRefs.current[hash];
        if (reviewEl) {
          reviewEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Ensure images and content are loaded by adding a slight delay
    const timeoutId = setTimeout(() => {
      scrollToElement();
      setTimeout(() => {
        setHighlightingRef(true);
        setTimeout(() => {
          setHighlightingRef(false);
        }, 500);
      }, 1000);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [reviews]); // Depend on reviews as they directly affect the refs and what's rendered

  return (
    <div className="flex flex-col">
      {reviews.map((review, index) => (
        <div
          key={index}
          id={`review_${review.id}`}
          ref={(el) => (reviewRefs.current[`review_${review.id}`] = el)}
          className={cn(
            'flex min-h-[100px] gap-2 rounded-sm p-3 transition-all duration-500 ease-in-out',
            `review_${review.id}` === window.location.hash.replace('#', '') &&
              highlightingRef &&
              'bg-primary/20',
          )}
        >
          <div className="w-[50px] flex-none">
            <Image
              src={review.user?.photoURL ?? '/icon.png'}
              alt={`${review.user?.displayName} avt`}
              width={1024}
              height={1024}
              className={cn(
                'aspect-square h-auto w-full rounded-full object-cover',
                review.user && 'cursor-pointer',
              )}
              priority
              onClick={() => {
                if (review.user) {
                  router.push(`/users/${review.user.uid}`);
                }
              }}
            />
          </div>
          <div className="gap flex w-full flex-col border-b border-foreground/50">
            <div className="flex flex-wrap items-center justify-between gap-1">
              <div className={cn('flex items-center gap-3 font-semibold')}>
                <span
                  className={cn(
                    '',
                    review.user && 'cursor-pointer hover:underline',
                  )}
                  onClick={() => {
                    if (review.user) {
                      router.push(`/users/${review.user.uid}`);
                    }
                  }}
                >
                  {review.user?.displayName ?? 'Deleted User'}
                </span>
                <span className="text-xs text-foreground/50">
                  {formatDistanceToNowStrict(review.updated ?? review.created, {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <DisplayReviewStars
                rating={review.rating}
                className="gap-[2px] text-primary-light"
                size={20}
              />
            </div>
            <div className="flex justify-between gap-2">
              <p className="line-clamp-3 flex text-sm text-foreground/70">
                {review.content}
              </p>
              <div className="mt-1 flex flex-none items-center gap-1 text-foreground/50">
                <Popover>
                  <PopoverTrigger>
                    <div className="cursor-pointer rounded-md p-1 hover:bg-primary/20">
                      <FaEllipsisV />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent align="end">
                    <div className="flex min-w-[100px] flex-col gap-1">
                      <ShareOnTwitter
                        url={`https://brewith.us/business/${review.bizID}#review_${review.id}`}
                        text={`Checkout this review for ${bizName}!`}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BrewReviews;
