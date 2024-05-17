'use client';
import { cn } from '@/lib/utils';
import React from 'react';
import { Icons } from '../icons';
import { googleSignInRedirect } from '@/config/firebase';

interface Props {
  redirect?: string;
}
const ThirdPartyLogins: React.FC<Props> = ({ redirect }) => {
  return (
    <div
      className={cn(
        'flex cursor-pointer items-center gap-2 rounded-[8px] bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-primary/10',
      )}
      onClick={() => {
        googleSignInRedirect();
      }}
    >
      <Icons.google />
      Login with Google
    </div>
  );
};

export default ThirdPartyLogins;
