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
    <div className="flex w-full flex-col gap-2">
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
            'flex w-full items-center justify-between border-b p-4',
            rubikFont.className,
          )}
        >
          <div className="text-3xl font-bold text-foreground/90">Menu</div>
          <div className={cn('flex-items flex-between gap-2')}>
            <CarouselPrevious className="relative -left-2 -right-0 top-0 -translate-y-0" />
            <CarouselNext className="relative -right-0 left-0 top-0 -translate-y-0" />
          </div>
        </div>

        <div className="px-2 py-2">
          <CarouselContent className="items-center">
            {chunks.map((chunk, index) => (
              <CarouselItem
                key={index}
                className="basis-1/1 flex flex-col gap-1 sm:basis-1/2 lg:basis-1/3"
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
