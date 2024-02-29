import * as React from 'react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { JSX, SVGProps } from 'react'; // Changed to import type
import { rubikFont } from '@/styles/fonts';

/**
 * Footer component with subscription form and social media links.
 * @returns JSX.Element
 */
export default function Footer(): JSX.Element {
  return (
    <section className="w-full py-2 md:py-4 lg:py-6 bg-secondary-dark/50">
      <div className="container px-4 md:px-6 flex flex-col items-center text-center">
        <h2
          className={`text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl/none text-secondary-foreground ${rubikFont.className}`}
        >
          Join Our Coffee Journey
        </h2>
        <p className="my-2 mx-auto max-w-[700px] text-sm md:text-md lg:text-lg text-secondary-foreground/90">
          Get the latest updates on the best coffee spots near you. Exclusive
          insights, early access to new features, and more, straight to your
          inbox.
        </p>
        <div className="w-full max-w-md space-y-2 my-2">
          <form className="flex space-x-2">
            <Input
              className="max-w-lg flex-1 bg-white text-black"
              placeholder="Enter your email"
              type="email"
            />
            <Button type="submit" variant="outline">
              Brew With Us
            </Button>
          </form>
        </div>
        <div className="flex justify-center space-x-4 my-2">
          <Link
            aria-label="Facebook page"
            className="text-black dark:text-white"
            href="#"
          >
            <FacebookIcon className="h-6 w-6" />
          </Link>
          <Link
            aria-label="Twitter profile"
            className="text-black dark:text-white"
            href="#"
          >
            <TwitterIcon className="h-6 w-6" />
          </Link>
          <Link
            aria-label="Instagram profile"
            className="text-black dark:text-white"
            href="#"
          >
            <InstagramIcon className="h-6 w-6" />
          </Link>
          <Link
            aria-label="LinkedIn profile"
            className="text-black dark:text-white"
            href="#"
          >
            <LinkedinIcon className="h-6 w-6" />
          </Link>
        </div>
        <p className="text-xs mt-2 text-muted-foreground">
          Discover new flavors, exclusive offers, and never miss an update from
          the world of coffee.
        </p>
      </div>
    </section>
  );
}

/**
 * Icon component for Facebook.
 * @param props - SVG properties.
 * @returns JSX.Element
 */
function FacebookIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
): JSX.Element {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

/**
 * Icon component for Instagram.
 * @param props - SVG properties.
 * @returns JSX.Element
 */
function InstagramIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
): JSX.Element {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

/**
 * Icon component for Linkedin.
 * @param props - SVG properties.
 * @returns JSX.Element
 */
function LinkedinIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
): JSX.Element {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

/**
 * Icon component for Twitter.
 * @param props - SVG properties.
 * @returns JSX.Element
 */
function TwitterIcon(
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>,
): JSX.Element {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
