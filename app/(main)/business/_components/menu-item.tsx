import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { poppinsFont } from '@/styles/fonts';
import { type MenuItem } from '../_types';

const MenuItemCard: React.FC<MenuItem> = ({ id, name, description, price }) => {
  return (
    <div className="group w-full max-w-[80vw] border-2 border-secondary-dark shadow-sm flex items-start gap-2 rounded-lg p-2">
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
            'text-foreground/90 font-medium flex flex-wrap justify-between mb-1 gap-1',
            poppinsFont.className,
          )}
        >
          <div className="relative group-hover:text-foreground transition-all duration-200">
            {name}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-primary transition-all duration-200" />
          </div>
          <span className="text-primary">{price}</span>
        </p>
        <p className="text-secondary-foreground/70 text-sm line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
};

export default MenuItemCard;
