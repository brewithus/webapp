import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}
/**
 * AuthLayout is a layout wrapper for authentication pages, providing a minimalistic environment for login, signup, etc.
 * @param {React.ReactNode} children - The content to be displayed within the layout, authentication forms like log in or sign up.
 * @returns {JSX.Element} The layout component with children.
 */
export default function AuthLayout({ children }: AuthLayoutProps): JSX.Element {
  return <div className="min-h-screen">{children}</div>;
}
