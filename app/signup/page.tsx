'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

/**
 * Sign Up Page Component
 *
 * This component is intended for new users to sign up. If a user is already logged in,
 * it redirects to the home page. This ensures that already authenticated users do not
 * access the sign-up page again.
 * @returns {JSX.Element} The JSX for the signup page or a redirection effect.
 */
const Page = (): JSX.Element => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  }, [user, router]);

  return <div>Sign up page</div>;
};

export default Page;
