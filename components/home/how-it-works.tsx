// Import React and any other dependencies you might need
import { rubikFont } from '@/styles/fonts';
import React from 'react';
import { Separator } from '../ui/separator';

/**
 * How It Works section for the Home page.
 * @returns The How It Works section as a React element.
 */
const HowItWorksSection: React.FC = () => {
  // Example steps data
  const steps = [
    {
      title: 'Choose Your Coffee Preferences',
      description:
        'Select your preferred coffee types, roasts, and brewing methods to tailor your coffee journey.',
    },
    {
      title: 'Explore & Enjoy',
      description:
        'Discover new coffee spots, learn brewing tips, and enjoy curated selections based on your tastes.',
    },
    {
      title: 'Share Your Coffee Experience',
      description:
        'Login with Google and share your thoughts by rating and reviewing your favorite coffee shops and drinks. Your reviews help others discover the best coffee spots.',
    },
  ];

  return (
    <section className="justify-center rounded-lg px-4 py-12">
      <h2
        className={`mb-4 py-2 text-center text-5xl font-bold ${rubikFont.className}`}
      >
        How It Works
      </h2>
      <div className="flex justify-center">
        <div className="w-full p-4 sm:w-4/5	md:w-3/4 lg:w-1/2">
          {steps.map((step, index) => (
            <div
              key={index}
              className="mb-4 flex items-center rounded-lg border-2 p-4"
            >
              <div className="mr-3 flex h-12 w-12 flex-none items-center justify-center rounded-full bg-secondary font-bold text-foreground">
                {index + 1}
              </div>
              <div className="flex-1">
                <p className="text-lg font-bold text-primary-light">
                  {step.title}
                </p>
                <Separator />

                <p className="pt-1 text-sm text-secondary-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
