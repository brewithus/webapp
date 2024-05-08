import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

/**
 * Forgot Password Page Component
 *
 * This component is intended current users to find their accounts
 * @returns {JSX.Element} The JSX code for rendering the page.
 */
const Page = (): JSX.Element => {
  return (
    <div className="container flex h-fit w-screen flex-col items-center justify-center">
      <div className="p-0 sm:p-12">
        <div className="flex w-full flex-col items-center justify-center gap-4 rounded-lg border-0 p-4 px-6 sm:w-[734px] sm:px-16 md:border-2">
          <div className="text-2xl font-extrabold md:text-xl ">
            Find Your Account
          </div>
          <Separator />
          <div className="flex w-full flex-col gap-2 self-start text-lg">
            <p>
              Please enter your email address or username to search for your
              account
            </p>
            <Input
              className="md:text-md flex-1 bg-white p-4 text-sm text-black"
              placeholder="Email or username"
              type="email"
            />
          </div>
          <Separator />
          <div className="flex gap-2 self-end">
            <Link
              href="/"
              className={cn(buttonVariants({ variant: 'outline' }), 'px-4')}
            >
              Cancel
            </Link>
            <Button>Search</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
