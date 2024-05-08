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
    <Card className="max-w-xs  border-2 bg-secondary/50 p-2 sm:max-w-full">
      <CardContent className="px-4 pb-2 pt-4">
        <CardTitle className="py-2 font-bold">{biz.name}</CardTitle>
        <CardDescription>
          {biz.location.display_address.join(', ')}
        </CardDescription>
        <div className="mt-4 flex flex-wrap gap-2">
          {biz.categories.map((cat) => (
            <Badge key={cat.alias} className="bg-primary-dark">
              {cat.title}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end px-4 py-4">
        <Button
          size={'sm'}
          onClick={() => {
            router.push(`/business/${biz.id}`);
          }}
        >
          Visit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoreCard;
