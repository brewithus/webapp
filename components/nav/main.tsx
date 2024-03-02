'use client';

import * as React from 'react';
import Link from 'next/link';

import type { MainNavItem } from '@/types';
import { Icons } from '@/components/icons';
import { MobileNav } from '@/components/nav/mobile';
import NavLink from './nav-link';
import { rubikFont } from '@/styles/fonts';
import { Menu } from 'lucide-react';
import { ModeToggle } from '../mode-toggle';
import { Button } from '../ui/button';

interface MainNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}

/**
 * Renders the main navigation menu.
 *
 * This component is designed to display the main navigation links across the top of the
 * application. It dynamically renders navigation items based on the `items` prop. This
 * component is typically visible on wider screens and hidden on mobile, where `MobileNav`
 * would be used instead.
 * @param {MainNavProps} props - The props for the MainNav component.
 * @param {MainNavItem[]} [props.items] - Array of main navigation items to display.
 * @param {React.ReactNode} [props.children] - Optional children to render additionally within the navigation.
 * @returns {JSX.Element} The MainNav component for desktop viewports.
 */
export function MainNav({ items, children }: MainNavProps): JSX.Element {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);
  // Function to toggle mobile menu visibility
  const toggleMobileMenu = (): void => {
    setShowMobileMenu(!showMobileMenu);
  };

  // Function to close the mobile menu
  const closeMobileMenu = (): void => {
    setShowMobileMenu(false);
  };

  return (
    <>
      <div className="flex gap-2 items-center">
        <Button
          variant={'ghost'}
          className="relative h-9 w-8 px-0 hover:bg-primary/50"
          onClick={toggleMobileMenu}
        >
          {showMobileMenu ? <Icons.close /> : <Menu />}
        </Button>
        <ModeToggle />
      </div>
      {showMobileMenu && items && (
        <MobileNav
          items={items}
          isOpen={showMobileMenu}
          onClose={closeMobileMenu}
        >
          {children}
        </MobileNav>
      )}
      <div className="flex gap-6 md:gap-10 justify-between">
        <Link className="flex items-center" href="/">
          <Icons.logo size={32} />
          <span
            className={`ml-6 font-bold text-2xl uppercase tracking-widest hidden md:block ${rubikFont.className}`}
          >
            Brew
          </span>
        </Link>
        {items?.length ? (
          <nav className="hidden gap-6 md:flex">
            <ModeToggle />
            {items?.map((item, index) => (
              <NavLink key={index} href={item.disabled ? '#' : item.href}>
                {item.title}
              </NavLink>
            ))}
          </nav>
        ) : null}
      </div>
    </>
  );
}
