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

export const metadata: Metadata = {
  title: 'Log in to Brew',
  description: 'Login to your account',
};

/**
 * Page component for handling user login redirection.
 *
 * This component is intended for current users to log in.
 * @returns {JSX.Element} The JSX code for rendering the page.
 */
export default function LoginPage(): JSX.Element {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: 'ghost' }),
          'absolute left-4 top-4 md:left-8 md:top-8',
        )}
      >
        <>
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          Back
        </>
      </Link>

      <div className="p-0 sm:p-12">
        <div className="rounded-lg border-0 md:border-2 p-4 w-full sm:w-[734px] flex flex-col justify-center items-center px-6 sm:px-16">
          <Icons.logo className="mx-auto h-10 w-10" />
          <div className="font-extrabold text-3xl md:text-4xl ">
            Log in to Brew
          </div>
          <Separator className="my-4" />
          <div className="w-96 flex flex-col gap-2">
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
            <div className="flex gap-2 items-center mt-2">
              <Switch
                id="remember-me"
                className="data-[state=unchecked]:bg-zinc-400"
                size="xs"
              />
              <Label htmlFor="remember-me" className="font-bold">
                Remember me
              </Label>
            </div>
            <Button className="rounded-[8px] my-2 font-bold">Log In</Button>
            <div className="flex items-center flex-col text-sm">
              <Link href="/reset-password" className="underline font-semibold">
                Forgot your password?
              </Link>
            </div>
          </div>
          <Separator className="hidden sm:block my-8" />

          <div className="px-12 py-4 sm:py-0 sm:pb-4 font-semibold text-sm flex flex-col sm:flex-row items-center gap-2 ">
            <span className="text-zinc-500">Don&apos;t have an account?</span>
            <Link href="/signup" className="underline">
              Sign up with Brew
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
