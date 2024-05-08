'use client';
import React from 'react';
import Autoplay from 'embla-carousel-autoplay';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Props {
  images: string[];
  height?: string;
  hidePrevNext?: boolean;
}

const BizImages: React.FC<Props> = ({ images, height, hidePrevNext }) => {
  const plugin = React.useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
    }),
  );

  return (
    <div className="h-full w-full">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        // onMouseEnter={plugin.current.stop}
        // onMouseLeave={plugin.current.reset}
        opts={{
          loop: true,
          dragFree: true,
        }}
      >
        <CarouselContent className="h-full gap-0">
          {images.map((image, index) => (
            <CarouselItem
              key={index}
              className={cn(
                'h-[400px] w-fit min-w-fit basis-1/12 pl-0',
                height && `h-[${height}]`,
              )}
            >
              <Image
                src={image}
                alt={`demo ${index}`}
                width={1024}
                height={1024}
                priority
                className="h-full w-auto object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        {hidePrevNext !== true && (
          <>
            <div className="absolute bottom-0 left-0 top-0  h-full ">
              <CarouselPrevious className="left-3 border-none bg-white text-black" />
            </div>
            <div className="absolute bottom-0 right-0 top-0  h-full ">
              <CarouselNext className="right-3 border-none bg-white text-black" />
            </div>
          </>
        )}
      </Carousel>
    </div>
  );
};

export default BizImages;
