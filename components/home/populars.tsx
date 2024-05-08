import React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import StoreCard from '../store/card';
import { rubikFont } from '@/styles/fonts';
import { sampleCafes } from '@/content/sample_cafes';

const PopularStoresSection: React.FC = () => {
  return (
    <section
      id="popular"
      className="px-4 py-12 rounded-lg md:px-8 justify-center"
    >
      <h2
        className={`py-2 text-5xl font-bold mb-4 text-center ${rubikFont.className}`}
      >
        Most Popular Coffee Shops
      </h2>
      <div className="px-12">
        <Carousel>
          <CarouselContent className="items-center">
            {sampleCafes.map((biz) => (
              <CarouselItem
                key={biz.name}
                className="basis-1/1 sm:basis-1/2 md:basis-1/3"
              >
                <StoreCard key={biz.name} biz={biz} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
};

export default PopularStoresSection;
