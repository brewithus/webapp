import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { poppinsFont } from '@/styles/fonts';
import { MenuItem } from '../_types';

const ProductCard: React.FC<MenuItem> = ({ id, name, description, price }) => {
  return (
    <div className="w-full bg-secondary/50 flex items-start gap-2 rounded-lg p-2">
      <div className="flex-none w-20 md:w-24">
        {/* Fixed width of 48px (w-12) */}
        <Image
          src={`/images/${id}.jpg`}
          alt={name}
          height={0}
          width={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }} // optional
          className="rounded-md aspect-square"
          priority
        />
      </div>

      <div className="flex flex-col w-full">
        <p
          className={cn(
            'text-secondary-foreground font-medium flex flex-wrap justify-between mb-1',
            poppinsFont.className,
          )}
        >
          {name}
          <span className="text-primary">{price}</span>
        </p>
        <p className="text-secondary-foreground/50 text-sm line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
