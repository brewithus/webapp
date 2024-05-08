import * as React from 'react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

/**
 * Handle invalid requested resource
 * @returns The 404 page with a `Return Home` button
 */
export default function NotFound(): JSX.Element {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex h-24 flex-row items-center justify-center gap-8">
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
