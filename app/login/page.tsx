'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

/**
 * Page component for handling user login redirection.
 *
 * This component checks if a user is already logged in by accessing the user state
 * from the UserContext. If a user is found, it redirects to the home page. This is typically
 * used on pages like Login or Signup to prevent already authenticated users from accessing them.
 * @returns {JSX.Element} The JSX for the login page or a redirection effect.
 */
const Page = (): JSX.Element => {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Redirect authenticated users to the home page.
    if (user) {
      router.push('/');
    }
  }, [user, router]); // React to changes in user or router to perform redirection if needed.

  return <div>Log in page</div>;
};

export default Page;
