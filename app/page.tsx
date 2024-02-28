import React from 'react';

import HeroSection from '@/components/home/hero';
import FeaturesSection from '@/components/home/features';
import PopularStoresSection from '@/components/home/populars';
import HowItWorksSection from '@/components/home/how-it-works';
import TestimonialsSection from '@/components/home/testinomials';

/**
 * Home page component.
 * Displays the home page with a clickable button.
 * @returns The home page React element.
 */
export default function Home(): JSX.Element {
  return (
    <div>
      <HeroSection />
      <div className="h-36 bg-gradient-to-b from-primary-light to-background dark:from-primary-dark"></div>
      <FeaturesSection />
      <PopularStoresSection />
      <HowItWorksSection />
      <TestimonialsSection />
    </div>
  );
}
