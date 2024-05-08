import { cn } from '@/lib/utils';
import React from 'react';
import { FaSquareXTwitter } from 'react-icons/fa6';

const ShareOnTwitter = ({
  url,
  text,
  className,
}: {
  url: string;
  text: string;
  className?: string;
}): React.ReactNode => {
  const handleShareOnTwitter = (): void => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(twitterShareUrl, '_blank');
  };

  return (
    <div
      className={cn(
        'flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-primary/10',
        className,
      )}
      onClick={handleShareOnTwitter}
    >
      <FaSquareXTwitter />
      Share On Twitter
    </div>
  );
};

export default ShareOnTwitter;
