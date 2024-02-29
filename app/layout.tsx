import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

import '../styles/globals.css';
import React from 'react'; // Ensure React is imported for JSX to work
import { ThemeProvider } from '../components/theme-provider';
import { cn } from '../lib/utils';
import Header from '../components/header';
import Footer from '@/components/footer';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: 'Brew',
  description: '- Discover Your Next Favorite Coffee Spot',
};

/**
 * Root layout component that wraps the entire application.
 * This component sets up the page's HTML structure and applies global styles,
 * including the font family defined through the `Inter` font.
 * @param {{ children: React.ReactNode }} props The properties passed to the component.
 * @param {React.ReactNode} props.children The child components to be rendered within this layout.
 * @returns The root layout structure as a JSX element.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header />
          <div className="min-h-screen pt-20">{children}</div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
