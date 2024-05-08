import React from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Button, buttonVariants } from '@/components/ui/button';
import Link from 'next/link';
import type { Metadata } from 'next';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import ThirdPartyLogins from '@/components/auth/third-party';

export const metadata: Metadata = {
  title: 'Log in to Brew',
  description: 'Login to your account',
};

/**
 * Represents the properties of the Page component.
 */
interface PageProps {
  /**
   * the search parameters passed to the page
   */
  queryParams: Record<string, string>;
}

/**
 * Page component for handling user login redirection.
 * This component is intended for current users to log in.
 * @param {PageProps} queryParams the page parameters with `redirect` param
 * @returns {JSX.Element} The JSX code for rendering the page.
 */
export default function LoginPage({ queryParams }: PageProps): React.ReactNode {
  const redirectQuery = queryParams?.redirect ?? '/';

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute left-4 top-4 hover:bg-primary-light/70 focus:bg-primary-light/60 md:left-8 md:top-8',
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>

      <div className="p-0 sm:p-12">
        <div className="flex w-full flex-col items-center justify-center rounded-lg border-0 p-4 px-6 sm:w-[734px] sm:px-16 md:border-2">
          <Icons.logo className="mx-auto h-10 w-10" />
          <div className="text-3xl font-extrabold md:text-4xl ">
            Log in to Brew
          </div>
          <Separator className="my-4" />
          <div className="flex w-96 flex-col gap-2">
            <div className="w-full">
              <Label className="font-bold">Email or username</Label>
              <Input
                className="flex-1 bg-white text-black"
                placeholder="Email or username"
                type="email"
              />
            </div>
            <div className="w-full">
              <Label className="font-bold">Password</Label>
              <Input
                className="flex-1 bg-white text-black"
                placeholder="Password"
                type="password"
              />
            </div>
            <div className="mt-2 flex items-center gap-2">
              <Switch
                id="remember-me"
                className="data-[state=unchecked]:bg-zinc-400"
                size="xs"
              />
              <Label htmlFor="remember-me" className="font-bold">
                Remember me
              </Label>
            </div>
            <Button className="my-2 rounded-[8px] font-bold">Log In</Button>
            <div className="flex flex-col items-center text-sm">
              <Link href="/forgot-password" className="font-semibold underline">
                Forgot your password?
              </Link>
            </div>
          </div>
          <Separator className="my-6 hidden sm:block" />

          <div className="flex flex-col items-center gap-2 px-12 py-4 text-sm font-semibold sm:flex-row sm:py-0 sm:pb-4 ">
            <span className="text-zinc-500">Don&apos;t have an account?</span>
            <Link href="/signup" className="underline">
              Sign up with Brew
            </Link>
          </div>
          <Separator className="my-6 hidden sm:block" />

          <ThirdPartyLogins redirect={redirectQuery} />
        </div>
      </div>
    </div>
  );
}
