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

interface StoreCardProps {
  name: string;
  picture: string;
  address: string;
  tags: string[];
}

const StoreCard: React.FC<StoreCardProps> = ({
  name,
  picture,
  address,
  tags,
}) => {
  return (
    <Card className="border-2 border-gray-200 dark:border-gray-800 p-2 max-w-xs sm:max-w-full">
      <CardContent className="pt-4 px-4 pb-2">
        <CardTitle className="py-2">{name}</CardTitle>
        <CardDescription className="text-right">{address}</CardDescription>
        <div className="tags flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end py-4 px-4">
        <Button size={'sm'} variant={'outline'}>
          Visit
        </Button>
      </CardFooter>
    </Card>
  );
};

export default StoreCard;
