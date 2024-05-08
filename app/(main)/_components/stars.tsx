import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import React from 'react';

interface StarsProps {
  rating: number;
  className?: string;
  size?: number;
}

const DisplayReviewStars: React.FC<StarsProps> = ({
  rating,
  className,
  size,
}) => {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {Array.from({ length: Math.round(rating ?? 0) }).map((_, index) => (
        <Icons.emptyStar key={index} size={size ?? 24} />
      ))}
      {Array.from({ length: 5 - Math.round(rating ?? 0) }).map((_, index) => (
        <Icons.emptyStar
          key={rating + index}
          className="text-gray-500"
          size={size ?? 24}
        />
      ))}
    </div>
  );
};

export default DisplayReviewStars;
