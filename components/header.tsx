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
  const [isOnTop, setIsOnTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingDown = currentScrollPos > prevScrollPos;

      setIsVisible(currentScrollPos <= 150 || !isScrollingDown);
      setPrevScrollPos(currentScrollPos);
      setIsOnTop(currentScrollPos < 30);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <header
      className={cn(
        'fixed top-0 right-0 left-0 z-40 bg-secondary-dark/80 px-8 md:px-12 transition-all duration-500',
        className,
        !isVisible && '-translate-y-full',
        isOnTop && 'bg-secondary-dark',
      )}
    >
      {children}
    </header>
  );
};

export default SensitiveHeader;
