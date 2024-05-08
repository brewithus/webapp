import React from 'react';
import MenuItemCard from './menu-item';
import { chunkArray, cn } from '@/lib/utils';
import { rubikFont } from '@/styles/fonts';
import { type MenuItem } from '../business/_types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface Props {
  items: MenuItem[];
}

const ProductList: React.FC<Props> = ({ items }) => {
  const chunks = chunkArray(items, 3);

  return (
    <div className="flex flex-col gap-2 w-full">
      <Carousel
        opts={
          {
            // dragFree: true,
          }
        }
      >
        <div
          id="biz-menu"
          className={cn(
            'p-4 w-full border-b flex items-center justify-between',
            rubikFont.className,
          )}
        >
          <div className="text-3xl font-bold text-foreground/90">Menu</div>
          <div className={cn('flex-items gap-2 flex-between')}>
            <CarouselPrevious className="relative -right-0 top-0 -left-2 -translate-y-0" />
            <CarouselNext className="relative -right-0 top-0 left-0 -translate-y-0" />
          </div>
        </div>

        <div className="px-2 py-2">
          <CarouselContent className="items-center">
            {chunks.map((chunk, index) => (
              <CarouselItem
                key={index}
                className="basis-1/1 sm:basis-1/2 lg:basis-1/3 flex flex-col gap-1"
              >
                {chunk.map((item, itemIndex) => (
                  <MenuItemCard key={itemIndex} {...item} />
                ))}
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
      </Carousel>
    </div>
  );
};
export default ProductList;
