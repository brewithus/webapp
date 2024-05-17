// components/Review.tsx
import React from 'react';
import { type Review } from '../business/_types';
import DisplayReviewStars from './stars';
import Image from 'next/image';

const ReviewComponent: React.FC<Review> = ({ user, rating, text }) => {
  return (
    <div className="flex w-full gap-2 p-4 ">
      <div className="w-16 flex-none md:w-24 ">
        {/* Fixed width of 48px (w-12) */}
        <Image
          src={user.image_url !== '' ? user.image_url : '/dummies/avatar1.png'}
          alt={user.name}
          height={0}
          width={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }} // optional
          className="aspect-square rounded-md"
          priority
        />
      </div>
      <div className="gap flex w-full flex-col border-b border-foreground/50">
        <div className="flex flex-wrap items-center justify-between gap-1">
          <span className="font-semibold">{user.name}</span>
          <DisplayReviewStars
            rating={rating}
            className="gap-[2px] text-primary-light"
            size={20}
          />
        </div>
        <p className="line-clamp-3 text-sm text-foreground/70">{text}</p>
      </div>
    </div>
  );
};

export default ReviewComponent;
