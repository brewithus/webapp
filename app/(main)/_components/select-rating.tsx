import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';

interface SelectRatingStarsProps {
  initialRating?: number;
  onChange?: (rating: number) => void;
  className?: string;
  size?: number;
}

const SelectRatingStars: React.FC<SelectRatingStarsProps> = ({
  initialRating = 0,
  onChange,
  className,
  size,
}) => {
  const [rating, setRating] = useState(initialRating);

  const handleRatingChange = (newRating: number): void => {
    setRating(newRating);
    if (onChange) {
      onChange(newRating);
    }
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {Array.from({ length: 5 }).map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => {
            handleRatingChange(index + 1);
          }}
          aria-label={`Rate ${index + 1} star${index !== 0 ? 's' : ''}`}
        >
          <Icons.emptyStar
            className={cn(
              rating >= index + 1 ? 'text-primary' : 'text-gray-500',
            )}
            size={size ?? 24}
          />
        </button>
      ))}
    </div>
  );
};

export default SelectRatingStars;
