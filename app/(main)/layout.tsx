import React from 'react';

import { mainConfig } from '@/config/main';
import { MainNav } from '@/components/nav/main';
import { Footer } from '@/components/footer';
import SensitiveHeader from '@/components/header';
import AuthButton from '@/components/auth/buttons';

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
      <SensitiveHeader>
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={mainConfig.mainNav} />
          <nav>
            <AuthButton />
          </nav>
        </div>
      </SensitiveHeader>
      <main className="mt-20 h-full grow">{children}</main>
      <Footer />
    </div>
  );
}
