'use client';
import { cn } from '@/lib/utils';

import React, { useState } from 'react';
import { buttonVariants } from '../ui/button';

import { googleSignInRedirect, googleSignOut } from '@/config/firebase';
import { useUser } from '@/context/UserContext';
import Image from 'next/image';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ChevronDown } from 'lucide-react';

const AuthButton = (): React.ReactNode => {
  const { user } = useUser();

  const [isOpen, setIsOpen] = useState(false);
  if (user)
    return (
      <div className="flex items-center gap-2">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger>
            <div className="flex items-center gap-1 text-sm font-semibold">
              <Image
                src={user.photoURL ?? '/icon.png'}
                alt="user photo"
                width={30}
                height={30}
                className="rounded-full"
              />
              <span className="hidden md:block">{user.displayName}</span>
              <ChevronDown
                size={20}
                className={cn(
                  'transition-all duration-300',
                  isOpen && 'rotate-180',
                )}
              />
            </div>
          </PopoverTrigger>
          <PopoverContent align="end">
            <div className="flex w-full flex-col gap-2">
              <a
                className={cn(
                  buttonVariants({ size: 'sm', variant: 'outline' }),
                  'cursor-pointer',
                )}
                href={`/users/${user.uid}`}
              >
                My Profile
              </a>
              <div
                className={cn(
                  buttonVariants({ size: 'sm', variant: 'secondary' }),
                  'w-full cursor-pointer px-4',
                )}
                onClick={() => {
                  googleSignOut();
                }}
              >
                Logout
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    );
  return (
    <div
      className={cn(
        buttonVariants({ size: 'sm', variant: 'secondary' }),
        'cursor-pointer px-4',
      )}
      onClick={() => {
        googleSignInRedirect();
      }}
    >
      Login
    </div>
  );
};

export default AuthButton;
