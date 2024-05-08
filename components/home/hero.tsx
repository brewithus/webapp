import React from 'react';
import { bigTitleFont, poppinsFont } from '@/styles/fonts';
import FindCoffeeSpot from '../find-coffee/FindCoffeeSpot';
import { sampleCafes } from '@/content/sample_cafes';
import BizImages from '@/app/(main)/_components/biz-images';

const HeroSection: React.FC = () => {
  return (
    <section
      className="relative h-[60vh] justify-center bg-primary-light dark:bg-primary-dark"
      // style={{
      //   backgroundImage: `url('/images/bg-3.jpg')`,
      //   backgroundSize: 'cover', // Cover the entire section
      //   backgroundPosition: 'center', // Center the background image
      //   backgroundRepeat: 'no-repeat', // Do not repeat the image
      // }}
    >
      <BizImages
        height="60vh"
        images={
          sampleCafes
            .map((sample) => sample.image_url)
            .filter((url) => url !== null) as string[]
        }
        hidePrevNext={true}
      />
      <div className="absolute bottom-0 left-0 right-0 top-0 flex h-full flex-col items-center justify-center gap-4 bg-gradient-to-t from-black/90 from-10% px-4 md:px-24 lg:px-32 xl:px-48">
        <h1
          className={`text-center text-7xl font-bold text-white ${bigTitleFont.className}`}
        >
          Discover Your Next Favorite Coffee Spot
        </h1>
        <p
          className={`p text-center text-lg text-muted-foreground text-white ${poppinsFont.className}`}
        >
          Find coffee shops near you, explore recommendations, and filter by
          preferences.
        </p>
        <FindCoffeeSpot />
      </div>
    </section>
  );
};

export default HeroSection;
