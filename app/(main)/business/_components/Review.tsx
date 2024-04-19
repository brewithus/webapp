// components/Review.tsx
import React from 'react';
import { Review } from '../_types';
import DisplayReviewStars from './stars';
import Image from 'next/image';

const ReviewComponent: React.FC<Review> = ({ user, rating, text }) => {
  return (
    <div className="p-4 flex gap-2 w-full">
      <div className="flex-none w-16 md:w-24 ">
        {/* Fixed width of 48px (w-12) */}
        <Image
          src={user.image_url !== '' ? user.image_url : '/dummies/avatar1.png'}
          alt={user.name}
          height={0}
          width={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }} // optional
          className="rounded-md aspect-square"
          priority
        />
      </div>
      <div className="flex flex-col w-full gap">
        <div className="flex flex-wrap gap-1 justify-between items-center">
          <span className="font-semibold">{user.name}</span>
          <DisplayReviewStars
            rating={rating}
            className="text-primary-light gap-[2px]"
            size={20}
          />
        </div>
        <p className="text-sm text-foreground/70 line-clamp-3">{text}</p>
      </div>
    </div>
  );
};

export default ReviewComponent;
