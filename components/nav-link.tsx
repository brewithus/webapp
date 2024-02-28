'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  const activeStyle = isActive ? 'bg-secondary hover:bg-secondary-dark' : '';

  return (
    <Link
      href={href}
      passHref
      className={`group inline-flex h-9 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary-light focus:outline-none  ${activeStyle}`}
    >
      {children}
    </Link>
  );
};

export default NavLink;
