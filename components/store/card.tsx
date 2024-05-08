'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { useRouter } from 'next/navigation';
import type { YelpBiz } from '@/types/yelp';

interface StoreCardProps {
  biz: YelpBiz;
}

const StoreCard: React.FC<StoreCardProps> = ({ biz }) => {
  const router = useRouter();

  return (
    <Card className="border-2  p-2 max-w-xs sm:max-w-full bg-secondary/50">
      <CardContent className="pt-4 px-4 pb-2">
        <CardTitle className="py-2 font-bold">{biz.name}</CardTitle>
        <CardDescription>
          {biz.location.display_address.join(', ')}
        </CardDescription>
        <div className="flex flex-wrap gap-2 mt-4">
          {biz.categories.map((cat) => (
            <Badge key={cat.alias} className="bg-primary-dark">
              {cat.title}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end py-4 px-4">
        <Button
          size={'sm'}
          onClick={() => {
            router.push(`/business/${biz.alias}`);
          }}
        >
          Visit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoreCard;
