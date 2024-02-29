import React from 'react';
import { Button } from '../ui/button';
import { bigTitleFont, poppinsFont } from '@/styles/fonts';

const HeroSection: React.FC = () => {
  return (
    <section
      className="h-[70vh] relative justify-center bg-primary-light dark:bg-primary-dark"
      style={{
        backgroundImage: `url('/images/bg-3.jpg')`,
        backgroundSize: 'cover', // Cover the entire section
        backgroundPosition: 'center', // Center the background image
        backgroundRepeat: 'no-repeat', // Do not repeat the image
      }}
    >
      <div className="flex flex-col justify-center items-center h-full backdrop-blur px-4 md:px-24 lg:px-32 xl:px-48">
        <h1
          className={`text-7xl font-bold text-center text-white ${bigTitleFont.className}`}
        >
          Discover Your Next Favorite Coffee Spot ☕
        </h1>
        <p
          className={`text-lg text-muted-foreground text-center py-4 p text-white ${poppinsFont.className}`}
        >
          Find coffee shops near you, explore recommendations, and filter by
          preferences.
        </p>
        <Button className="font-bold">Find Coffee Near Me</Button>
      </div>
    </section>
  );
};

export default HeroSection;
