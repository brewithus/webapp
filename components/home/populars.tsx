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
      className="justify-center rounded-lg px-4 py-12 md:px-8"
    >
      <h2
        className={`mb-4 py-2 text-center text-5xl font-bold ${rubikFont.className}`}
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
