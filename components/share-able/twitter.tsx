import React from 'react';
import { FaSquareXTwitter } from 'react-icons/fa6';

const ShareOnTwitter = ({
  url,
  text,
}: {
  url: string;
  text: string;
}): React.ReactNode => {
  const handleShareOnTwitter = (): void => {
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    window.open(twitterShareUrl, '_blank');
  };

  return (
    <div
      className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-primary/10 cursor-pointer"
      onClick={handleShareOnTwitter}
    >
      <FaSquareXTwitter />
      Share On Twitter
    </div>
  );
};

export default ShareOnTwitter;
