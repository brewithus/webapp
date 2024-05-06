import { cn } from '@/lib/utils';
import { rubikFont } from '@/styles/fonts';
import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<Props> = ({ title, children, className }) => {
  return (
    <div className="flex flex-col gap-2">
      <div
        id={title.toLowerCase().split(' ').join('-')}
        className="flex self-start items-center gap-2 justify-between px-4 py-2 w-full border-b"
      >
        <p
          className={cn(
            'text-2xl font-bold text-center text-foreground/90',
            rubikFont.className,
          )}
        >
          {title}
        </p>
      </div>
      <div className={cn('w-full px-4 font-medium', className)}>{children}</div>
    </div>
  );
};

export default Section;
