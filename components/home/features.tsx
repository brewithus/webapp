import React from 'react';

import { rubikFont } from '@/styles/fonts';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: '⭐',
    title: 'Personalized Recommendations',
    description: 'Get matched with shops based on your preferences.',
  },
  {
    icon: '🔍',
    title: 'Filter by Restrictions',
    description: 'Find shops that cater to dietary needs.',
  },
  {
    icon: '📍',
    title: 'Interactive Maps',
    description: 'Easily explore coffee shops in your area.',
  },
  // Add more features as needed
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="justify-center rounded-lg px-4 py-12 md:px-8">
      <h2
        className={`mb-4 py-2 text-center text-5xl font-bold ${rubikFont.className}`}
      >
        Features
      </h2>
      <div className="flex flex-wrap justify-items-center gap-4 md:px-24 lg:px-48">
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
    <div className="relative w-64 flex-auto rounded-lg border-2 p-4 text-primary-light">
      <span className="absolute right-2 top-2">{icon}</span>
      <h3 className="mb-2 text-lg font-bold">{title}</h3>
      <p className="text-sm leading-loose text-muted-foreground">
        {description}
      </p>
    </div>
  );
};
