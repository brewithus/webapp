import React from 'react';

import HeroSection from '@/components/home/hero';
import FeaturesSection from '@/components/home/features';
import HowItWorksSection from '@/components/home/how-it-works';
import PopularStoresSection from '@/components/home/populars';
import TestimonialsSection from '@/components/home/testinomials';

/**
 * Home page component.
 *
 * Displays the home page with a clickable button.
 * @returns The home page React element.
 */
export default function Home(): JSX.Element {
  return (
    <div>
      <HeroSection />
      <PopularStoresSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
    </div>
  );
}
