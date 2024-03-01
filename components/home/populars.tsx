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

interface CoffeeShop {
  id: string;
  name: string;
  picture: string;
  address: string;
  tags: string[];
}
const coffeeShops: CoffeeShop[] = [
  {
    id: 'the-daily-grind',
    name: 'The Daily Grind',
    picture:
      'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg',
    address: '123 Main St, Anytown, CA',
    tags: ['Cozy', 'WiFi', 'Coffee', 'Tea', 'Pastries'],
  },
  {
    id: 'bean-there-done-that',
    name: 'Bean There, Done That',
    picture:
      'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg',
    address: '456 Elm St, Anytown, CA',
    tags: ['Modern', 'Coffee', 'Cold Brew', 'Sandwiches'],
  },
  {
    id: 'perk-up',
    name: 'Perk Up!',
    picture:
      'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg',
    address: '789 Oak St, Anytown, CA',
    tags: ['Drive-Thru', 'Coffee', 'Lattes', 'Smoothies'],
  },
  {
    id: 'the-coffee-nook',
    name: 'The Coffee Nook',
    picture:
      'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg',
    address: '1011 Pine St, Anytown, CA',
    tags: ['Independent', 'Coffee', 'Tea', 'Snacks'],
  },
  {
    id: 'brewhaha',
    name: 'Brewhaha',
    picture:
      'https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg',
    address: '1234 Maple St, Anytown, CA',
    tags: ['Spacious', 'Coffee', 'Beer', 'Wine'],
  },
];

const PopularStoresSection: React.FC = () => {
  return (
    <section className="px-4 py-12 rounded-lg md:px-8 justify-center">
      <h2
        className={`py-2 text-5xl font-bold mb-4 text-center ${rubikFont.className}`}
      >
        Most Popular Coffee Shops
      </h2>
      <div className="px-12">
        <Carousel>
          <CarouselContent className="items-center">
            {coffeeShops.map((shop) => (
              <CarouselItem
                key={shop.name}
                className="basis-1/1 sm:basis-1/2 md:basis-1/3"
              >
                <StoreCard key={shop.name} {...shop} />
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
