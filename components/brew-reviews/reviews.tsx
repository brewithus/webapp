'use client';

import type { BrewReview } from '@/types/brew';
import React from 'react';

import Image from 'next/image';
import DisplayReviewStars from '@/app/(main)/_components/stars';
import { formatDistanceToNowStrict } from 'date-fns';
interface Props {
  reviews: BrewReview[];
}
const BrewReviews: React.FC<Props> = ({ reviews }) => {
  return (
    <div className="flex flex-col">
      {reviews.map((review, index) => (
        <div key={index} className="p-3 rounded-sm flex gap-2 min-h-[100px]">
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
            <p className="text-sm text-foreground/70 line-clamp-3">
              {review.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BrewReviews;
