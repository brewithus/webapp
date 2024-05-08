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
        className="flex w-full items-center justify-between gap-2 self-start border-b px-4 py-2"
      >
        <p
          className={cn(
            'text-center text-2xl font-bold text-foreground/90',
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
