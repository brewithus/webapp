'use client';

import * as React from 'react';
import Link from 'next/link';

import { MainNavItem } from '@/types';
import { Icons } from '@/components/icons';
import { MobileNav } from '@/components/nav/mobile';
import NavLink from './nav-link';
import { rubikFont } from '@/styles/fonts';
import { Menu } from 'lucide-react';

interface MainNavProps {
  items?: MainNavItem[];
  children?: React.ReactNode;
}

export function MainNav({ items, children }: MainNavProps) {
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);
  // Function to toggle mobile menu visibility
  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);

  // Function to close the mobile menu
  const closeMobileMenu = () => setShowMobileMenu(false);

  return (
    <>
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={toggleMobileMenu}
      >
        {showMobileMenu ? <Icons.close /> : <Menu />}
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items} onClose={closeMobileMenu}>
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
