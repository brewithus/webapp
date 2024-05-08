import React from 'react';
import Content from '@/content/privacy-policy.mdx';
const Page = (): React.ReactNode => {
  return (
    <div className="container pb-8">
      <Content />
    </div>
  );
};

export default Page;
