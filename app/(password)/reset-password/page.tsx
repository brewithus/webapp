import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

/**
 * Reset Password Page Component
 *
 * This component is intended for new users to sign up.
 * @returns {JSX.Element} The JSX code for rendering the page.
 */
const Page = (): JSX.Element => {
  return (
    <div className="container flex h-fit w-screen flex-col items-center justify-center">
      <div className="p-0 sm:p-12">
        <div className="rounded-lg border-0 md:border-2 p-4 w-full sm:w-[734px] flex flex-col justify-center items-center px-6 sm:px-16 gap-4">
          <div className="font-extrabold text-2xl md:text-xl ">
            Reset your password
          </div>
          <Separator />
          <div className="flex flex-col gap-2 self-start w-full text-lg">
            <Input
              className="flex-1 bg-white text-black text-sm md:text-md p-4"
              placeholder="New password"
              type="new_password"
            />
            <Input
              className="flex-1 bg-white text-black text-sm md:text-md p-4"
              placeholder="Confirm new password"
              type="new_password_confirm"
            />
          </div>
          <Separator />
          <div className="flex self-end gap-2">
            <Link
              href="/"
              className={cn(buttonVariants({ variant: 'outline' }), 'px-4')}
            >
              Cancel
            </Link>
            <Button>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
