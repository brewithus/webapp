import { Button } from '@/components/ui/button';
import React from 'react'; // Explicitly import React (if needed, depending on your setup)

/**
 * Home page component.
 * Displays the home page with a clickable button.
 * @returns The home page React element.
 */
export default function Home(): JSX.Element {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  );
}
