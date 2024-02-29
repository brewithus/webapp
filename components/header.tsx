'use client';

import { useRouter } from 'next/navigation';

import * as React from 'react';

import Link from 'next/link';
import { Button } from './ui/button';

import NavLink from './nav-link';
import { ModeToggle } from './mode-toggle';
import { Icons } from './icons';
import { Menu, ChevronLeft } from 'lucide-react';
import { rubikFont } from '@/styles/fonts';
import {
  DrawerContent,
  DrawerClose,
  Drawer,
  DrawerPortal,
  DrawerTrigger,
} from './ui/drawer';

/**
 * Renders the header section of the website.
 * @returns JSX.Element
 */
export default function Header(): JSX.Element {
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  // Function to handle login navigation
  const handleLoginClick = (): void => {
    router.push('/login');
  };

  // Function to handle signup navigation
  const handleSignUpClick = (): void => {
    router.push('/signup');
  };
  return (
    <div className="w-full px-4 md:px-6 lg:px-8 fixed top-0 z-50 bg-background">
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 justify-between">
        <div className="block sm:hidden">
          {/* Side Drawer */}
          <Drawer
            direction="left"
            open={isDrawerOpen}
            onOpenChange={setIsDrawerOpen}
          >
            <DrawerTrigger asChild>
              <Menu />
            </DrawerTrigger>
            <DrawerPortal>
              <DrawerContent className="flex flex-col rounded-t-[10px] h-full w-[400px] mt-24 fixed bottom-0 right-0">
                <div className="flex justify-between px-6 py-4">
                  <Icons.logo size={36} />
                  <DrawerClose asChild className="p-0">
                    <Button
                      variant="ghost"
                      className="p-4 hover:bg-accent/50 focus:bg-accent/50 "
                    >
                      <ChevronLeft className="mr-2 h-4 w-4" /> Close
                    </Button>
                  </DrawerClose>
                </div>
                <div className="flex flex-col gap-4 items-stretch px-4">
                  <NavLink href="/">Home</NavLink>
                  <NavLink href="/about">About</NavLink>
                  <Button onClick={handleLoginClick}>Log in</Button>
                  <Button onClick={handleSignUpClick} variant={'outline'}>
                    Sign Up
                  </Button>
                </div>
              </DrawerContent>
            </DrawerPortal>
          </Drawer>
        </div>
        <Link className="flex items-center" href="/">
          <Icons.logo size={36} />
          <span
            className={`ml-6 font-bold text-3xl uppercase tracking-widest hidden sm:block ${rubikFont.className}`}
          >
            Brew
          </span>
        </Link>
        <div className="ml-auto gap-2 hidden sm:flex items-center">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About</NavLink>
          <Button onClick={handleLoginClick}>Log in</Button>
          <Button onClick={handleSignUpClick} variant={'outline'}>
            Sign Up
          </Button>
          <div className="block">
            <ModeToggle />
          </div>
        </div>
        <div className="block sm:hidden">
          <ModeToggle />
        </div>
      </header>
    </div>
  );
}
