'use client';
import { cn } from '@/lib/utils';

import React from 'react';
import { buttonVariants } from '../ui/button';

import { googleSignInRedirect, googleSignOut } from '@/config/firebase';
import { useUser } from '@/context/UserContext';
import Image from 'next/image';

const AuthButton = (): React.ReactNode => {
  const { user } = useUser();
  if (user)
    return (
      <div className="flex items-center gap-2">
        <div className="flex text-sm font-semibold items-center gap-1">
          <Image
            src={user.photoURL ?? '/icon.png'}
            alt="user photo"
            width={30}
            height={30}
            className="rounded-full"
          />
          <span className="hidden md:block">{user.displayName}</span>
        </div>
        <div
          className={cn(
            buttonVariants({ size: 'sm', variant: 'secondary' }),
            'px-4 cursor-pointer',
          )}
          onClick={() => {
            googleSignOut();
          }}
        >
          Logout
        </div>
      </div>
    );
  return (
    <div
      className={cn(
        buttonVariants({ size: 'sm', variant: 'secondary' }),
        'px-4 cursor-pointer',
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
