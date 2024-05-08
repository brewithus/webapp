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

interface Props {
  bizName: string;
  reviews: BrewReview[];
}

const BrewReviews: React.FC<Props> = ({ reviews, bizName }) => {
  const reviewRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [highlightingRef, setHighlightingRef] = React.useState(false);

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
            'p-3 rounded-sm flex gap-2 min-h-[100px] transition-all ease-in-out duration-500',
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
              className="object-cover aspect-square w-full h-auto rounded-full"
              priority
            />
          </div>
          <div className="flex flex-col w-full gap border-b border-foreground/50">
            <div className="flex flex-wrap gap-1 justify-between items-center">
              <div className="font-semibold flex items-center gap-3">
                <span>{review.user?.displayName ?? 'Deleted User'}</span>
                <span className="text-foreground/50 text-xs">
                  {formatDistanceToNowStrict(review.updated ?? review.created, {
                    addSuffix: true,
                  })}
                </span>
              </div>
              <DisplayReviewStars
                rating={review.rating}
                className="text-primary-light gap-[2px]"
                size={20}
              />
            </div>
            <div className="flex justify-between gap-2">
              <p className="flex text-sm text-foreground/70 line-clamp-3">
                {review.content}
              </p>
              <div className="flex-none text-foreground/50 mt-1 flex items-center gap-1">
                <Popover>
                  <PopoverTrigger>
                    <div className="p-1 hover:bg-primary/20 cursor-pointer rounded-md">
                      <FaEllipsisV />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent align="end">
                    <div className="flex flex-col min-w-[100px] gap-1">
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
