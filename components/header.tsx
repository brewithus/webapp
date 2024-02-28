import Link from 'next/link';
import { Button } from './ui/button';
import { GiCoffeeCup } from 'react-icons/gi';
import NavLink from './nav-link';
import { ModeToggle } from './mode-toggle';
import { Icons } from './icons';

export default function Header() {
  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 fixed top-0 z-50 bg-background">
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        <Link className="mr-6 lg:flex" href="#">
          <Icons.logo size={36} />
          <span className="sr-only">Coffee Shop Finder</span>
        </Link>
        <div className="ml-auto flex gap-2">
          <ModeToggle />
          <NavLink href="/" children={'Home'} />
          <NavLink href="/about" children={'About'} />
          <Button className="justify-self-end">Log in</Button>
          <Button className="justify-self-end" variant={'outline'}>
            Sign Up
          </Button>
        </div>
      </header>
    </div>
  );
}
