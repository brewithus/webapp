import * as React from 'react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

/**
 * Handle invalid requested resource
 * @returns The 404 page with a `Return Home` button
 */
export default function NotFound(): JSX.Element {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-row h-24 gap-3 items-center justify-center">
        <h2 className="text-3xl">404</h2>
        <Separator orientation="vertical" />
        <div className="flex flex-col items-center justify-center gap-3">
          <p>Could not find requested resource</p>
          <Link
            href="/"
            className="rounded-lg bg-secondary px-3 py-2 hover:bg-secondary/90"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
