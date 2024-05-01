'use client';
import { cn } from '@/lib/utils';
import React, { useEffect, useState } from 'react';

interface SensitiveHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const SensitiveHeader: React.FC<SensitiveHeaderProps> = ({
  children,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = (): void => {
      const currentScrollPos = window.scrollY;
      const isScrollingDown = currentScrollPos > prevScrollPos;

      setIsVisible(currentScrollPos <= 150 || !isScrollingDown);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-40 bg-secondary-dark px-8 md:px-12 transition-all duration-300',
        className,
        !isVisible && '-translate-y-full',
      )}
    >
      {children}
    </header>
  );
};

export default SensitiveHeader;
