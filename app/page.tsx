import HeroSection from '@/components/home/hero';
import FeaturesSection from '@/components/home/features';
import PopularStores from '@/components/home/populars';

/**
 * Home page component.
 * Displays the home page with a clickable button.
 * @returns The home page React element.
 */
export default function Home(): JSX.Element {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <PopularStores />
    </div>
  );
}
