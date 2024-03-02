'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

/**
 * Profile Page Component
 *
 * This component is responsible for rendering the user's profile page. It leverages the
 * `useUser` context to access the current user's information. If no user is logged in
 * (i.e., `user` is null), the component redirects to the login page using Next.js's `useRouter`.
 * @returns {JSX.Element} The JSX for the profile page or a redirection effect.
 */
const Page = (): JSX.Element => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  return <div>Profile Page</div>;
};

export default Page;
