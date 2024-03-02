import * as React from 'react';
import Link from 'next/link';

import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { useLockBody } from '@/hooks/use-lock-body';
import { Icons } from '@/components/icons';
import type { MainNavItem } from '@/types';

interface MobileNavProps {
  items: MainNavItem[];
  children?: React.ReactNode;
  isOpen: boolean; // Added to represent the open state
  onClose: () => void;
}

/**
 * Renders a mobile navigation menu that is toggleable via the `isOpen` prop.
 *
 * The navigation presents the site's logo and a list of navigation items. It uses the `useLockBody`
 * hook to prevent body scroll when open. The `onClose` callback is invoked to close the menu.
 * @param {MobileNavProps} props - The props for the MobileNav component.
 * @returns {JSX.Element} - The MobileNav component.
 */
export function MobileNav({
  items,
  children,
  isOpen,
  onClose,
}: MobileNavProps): JSX.Element {
  useLockBody(isOpen); // Pass the `isOpen` state to the hook

  return (
    <div
      className={cn(
        'fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden',
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <Link
          href="/"
          onClick={onClose}
          className="flex items-center space-x-2"
        >
          <Icons.logo />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {items.map((item, index) => (
            <Link
              key={index}
              onClick={onClose}
              href={item.disabled ? '#' : item.href}
              className={cn(
                'flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline',
                item.disabled && 'cursor-not-allowed opacity-60',
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  );
}
