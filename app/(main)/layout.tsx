import React from 'react';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { mainConfig } from '@/config/main';
import { MainNav } from '@/components/nav/main';
import { Footer } from '@/components/footer';
import Link from 'next/link';

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * MainLayout serves as the primary layout for the application, encompassing a header, main content area, and footer.
 * It provides a consistent structure and navigation experience across the app.
 * @param {React.ReactNode} children - The main content to be displayed within the layout.
 * @returns {JSX.Element} The layout component containing the application's global header, main content, and footer.
 */
export default function MainLayout({ children }: MainLayoutProps): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="z-40 bg-secondary-dark/50 px-8 md:px-12">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={mainConfig.mainNav} />
          <nav>
            <Link
              href="/login"
              className={cn(buttonVariants({ size: 'sm' }), 'px-4')}
            >
              Login
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
