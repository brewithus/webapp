import * as React from 'react';

import Link from 'next/link';
import { Button } from './ui/button';

import NavLink from './nav-link';
import { ModeToggle } from './mode-toggle';
import { Icons } from './icons';

/**
 * Renders the header section of the website.
 * @returns JSX.Element
 */
export default function Header(): JSX.Element {
  return (
    <div className="w-full px-4 md:px-6 lg:px-8 fixed top-0 z-50 bg-background">
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        <Link className="mr-6 lg:flex" href="/">
          <Icons.logo size={36} />
          <span className="sr-only">Coffee Shop Finder</span>
        </Link>
        <div className="ml-auto flex gap-2">
          <ModeToggle />
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <Button className="justify-self-end">Log in</Button>
          <Button className="justify-self-end" variant={'outline'}>
            Sign Up
          </Button>
        </div>
      </header>
    </div>
  );
}
