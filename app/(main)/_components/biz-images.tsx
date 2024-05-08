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

interface Props {
  images: string[];
}
const BizImages: React.FC<Props> = ({ images }) => {
  const plugin = React.useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
    }),
  );

  return (
    <div className="w-full h-full">
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{
          loop: true,
          dragFree: true,
        }}
      >
        <CarouselContent className="h-full gap-0">
          {images.map((image, index) => (
            <CarouselItem
              key={index}
              className="h-[400px] w-fit pl-0 basis-1/12 min-w-fit"
            >
              <Image
                src={image}
                alt={`demo ${index}`}
                width={1024}
                height={1024}
                priority
                className="object-cover h-full w-auto"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute top-0 bottom-0 left-0  h-full ">
          <CarouselPrevious className="left-3 text-black border-none bg-white" />
        </div>
        <div className="absolute top-0 bottom-0 right-0  h-full ">
          <CarouselNext className="right-3 text-black border-none bg-white" />
        </div>
      </Carousel>
    </div>
  );
};

export default BizImages;
