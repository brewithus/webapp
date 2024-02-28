import React from 'react';

import { rubikFont } from '@/styles/fonts';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: 'star',
    title: 'Personalized Recommendations',
    description: 'Get matched with shops based on your preferences.',
  },
  {
    icon: 'filter',
    title: 'Filter by Restrictions',
    description: 'Find shops that cater to dietary needs.',
  },
  {
    icon: 'map',
    title: 'Interactive Maps',
    description: 'Easily explore coffee shops in your area.',
  },
  // Add more features as needed
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="px-4 pb-24 rounded-lg md:px-8 justify-center">
      <h2
        className={`py-2 text-5xl font-bold mb-4 text-center text-primary ${rubikFont.className}`}
      >
        Features
      </h2>
      <div className="flex gap-4 justify-items-center md:px-24 lg:px-48">
        {features.map((feature) => (
          <FeatureCard key={feature.title} {...feature} />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="flex-auto w-64 rounded-lg p-4 shadow-md text-primary-light border-2">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm leading-loose text-muted-foreground">
        {description}
      </p>
    </div>
  );
};
