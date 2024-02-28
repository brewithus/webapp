import React from 'react';
import { Button } from '../ui/button';
import { rubikFont } from '@/styles/fonts';

const HeroSection: React.FC = () => {
  return (
    <section className="h-[40vh] pt-36 px-4 md:px-8 lg:px-16 relative justify-center bg-zinc-900">
      <div className="flex flex-col justify-center items-center h-full px-4 md:px-24 lg:px-32 xl:px-48">
        <h1
          className={`text-6xl font-bold text-foreground text-center ${rubikFont.className}`}
        >
          Discover Your Next Favorite Coffee Spot ☕
        </h1>
        <p className="text-lg text-gray-600 text-center py-4 p dark:text-gray-400">
          Find coffee shops near you, explore recommendations, and filter by
          preferences.
        </p>
        <Button className="font-bold">Find Coffee Near Me</Button>
      </div>
    </section>
  );
};

export default HeroSection;
