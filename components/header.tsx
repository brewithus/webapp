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
import { useUser } from '@/context/UserContext';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from './ui/dropdown-menu';

/**
 * Renders the header section of the website.
 * @returns JSX.Element
 */
export default function Header(): JSX.Element {
  const router = useRouter();
  const { user, setUser } = useUser();

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  // Function to handle login navigation
  const handleLoginClick = (): void => {
    // router.push('/login');
    // Set the dummy user data
    setUser({
      username: 'blue',
      firstName: 'John',
      lastName: 'Doe',
      phoneNo: '123-456-7890',
      userId: '1',
    });

    console.log(user);
  };
  // Function to handle login navigation
  const handleLogoutClick = (): void => {
    // router.push('/login');
    // Set the dummy user data
    setUser(null);
  };

  // Function to handle signup navigation
  const handleSignUpClick = (): void => {
    router.push('/signup');
  };

  const NavLinks = (): JSX.Element => {
    return (
      <>
        <NavLink href="/">Home</NavLink>
        <NavLink href="/about">About</NavLink>
        {!user ? (
          <>
            <Button onClick={handleLoginClick}>Log in</Button>
            <Button onClick={handleSignUpClick} variant={'outline'}>
              Sign Up
            </Button>
          </>
        ) : (
          <>
            <Button
              className="block sm:hidden"
              onClick={handleLogoutClick}
              variant={'outline'}
            >
              Log out
            </Button>
            <UserDropdownMenu>
              <Avatar className="hidden sm:block ml-2 border-2 border-primary cursor-pointer">
                <AvatarImage
                  src="https://github.com/bluesimp1102.png"
                  alt="@bluesimp1102"
                />
                <AvatarFallback>CB</AvatarFallback>
              </Avatar>
            </UserDropdownMenu>
            <div className="flex flex-row items-center self-center gap-6 block sm:hidden">
              <Avatar className="h-16 w-16 border-2 border-primary">
                <AvatarImage
                  src="https://github.com/bluesimp1102.png"
                  alt="@bluesimp1102"
                />
                <AvatarFallback>CB</AvatarFallback>
              </Avatar>
              <div className="block sm:hidden font-semibold text-xl flex flex-col">
                <span className="font-bold">
                  {user.firstName} {user.lastName}
                </span>
                <span className="text-sm">@{user.username}</span>
              </div>
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <div className="w-full px-4 md:px-6 lg:px-8 fixed top-0 z-50 bg-background">
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6 justify-between">
        <div className="block sm:hidden">
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
                  <NavLinks />
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
          <div className="block">
            <ModeToggle />
          </div>
          <NavLinks />
        </div>
        <div className="block sm:hidden">
          <ModeToggle />
        </div>
      </header>
    </div>
  );
}

const UserDropdownMenu: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, setUser } = useUser();
  const router = useRouter();

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-2">
        <DropdownMenuLabel className="flex flex-col ">
          <span className="font-bold text-lg">
            {user.firstName} {user.lastName}
          </span>
          <span>@{user.username}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              router.push('/me');
            }}
          >
            Profile
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            setUser(null);
          }}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
