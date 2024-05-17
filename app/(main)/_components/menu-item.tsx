import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { poppinsFont } from '@/styles/fonts';
import { type MenuItem } from '../business/_types';

const MenuItemCard: React.FC<MenuItem> = ({ id, name, description, price }) => {
  return (
    <div className="group flex w-full max-w-[80vw] items-start gap-2 rounded-lg border-2 border-secondary-dark p-2 shadow-sm">
      <div className="w-20 flex-none md:w-24">
        {/* Fixed width of 48px (w-12) */}
        <Image
          src={`/images/${id}.jpg`}
          alt={name}
          height={0}
          width={0}
          sizes="100vw"
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }} // optional
          className="aspect-square rounded-md"
          priority
        />
      </div>

      <div className="flex w-full flex-col">
        <p
          className={cn(
            'mb-1 flex flex-wrap justify-between gap-1 font-medium text-foreground/90',
            poppinsFont.className,
          )}
        >
          <div className="relative transition-all duration-200 group-hover:text-foreground">
            {name}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary transition-all duration-200 group-hover:w-full" />
          </div>
          <span className="text-primary">{price}</span>
        </p>
        <p className="line-clamp-3 text-sm text-secondary-foreground/70">
          {description}
        </p>
      </div>
    </div>
  );
};

export default MenuItemCard;
