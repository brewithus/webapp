import { Footer } from '@/components/footer';
import { MainNav } from '@/components/nav/main';
import { buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { passwordResetConfig } from '@/config/password-reset';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

interface PasswordLayoutProps {
  children: React.ReactNode;
}
/**
 * PasswordLayout is a layout wrapper for authentication pages, providing a minimalistic environment for login, signup, etc.
 * @param {React.ReactNode} children - The content to be displayed within the layout, authentication forms like log in or sign up.
 * @returns {JSX.Element} The layout component with children.
 */
export default function PasswordLayout({
  children,
}: PasswordLayoutProps): JSX.Element {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="z-40 bg-secondary-dark/50 px-8 md:px-12">
        <div className="flex h-20 items-center justify-between py-6">
          <MainNav items={passwordResetConfig.mainNav} />

          <nav className="flex flex-row items-center gap-2">
            <Input
              className="hidden flex-1 bg-white text-black md:block"
              placeholder="Email or username"
              type="email"
            />
            <Input
              className="hidden flex-1 bg-white text-black md:block"
              placeholder="Password"
              type="password"
            />
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: 'default', size: 'sm' }),
                'px-4 font-semibold',
              )}
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
