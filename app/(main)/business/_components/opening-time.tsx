'use client';
import { cn } from '@/lib/utils';
import { poppinsFont } from '@/styles/fonts';
import React from 'react';
import {
  formatOpeningTimes,
  getTodayDayTime,
  isBusinessOpen,
  reverseGeocodingWithGoogle,
} from '../_utils/time-helpers';
import { type Coordinates, type Hour } from '@/types/yelp';
import { Badge } from '@/components/ui/badge';

interface Props {
  hours: Hour[];
  coordinates: Coordinates;
}

const OpeningTime: React.FC<Props> = ({ hours, coordinates }) => {
  const [bizLocalTime, setBizLocalTime] = React.useState(new Date());
  const [todayOpenTime, setTodayOpenTime] = React.useState(
    getTodayDayTime(bizLocalTime, hours),
  );

  React.useEffect(() => {
    setTodayOpenTime(getTodayDayTime(bizLocalTime, hours));
  }, [bizLocalTime, hours]);

  React.useEffect(() => {
    reverseGeocodingWithGoogle(coordinates.latitude, coordinates.longitude)
      .then((time) => {
        if (time) {
          console.log(time);
          setBizLocalTime(time);
        }
      })
      .catch((e) => {});
  }, [coordinates]);

  return (
    <div
      className={cn(
        'font-medium flex items-center gap-2 mt-2',
        poppinsFont.className,
      )}
    >
      <Badge className="text-md bg-primary/50">
        {/* {coffeeShop.status} */}
        {todayOpenTime && isBusinessOpen(todayOpenTime, bizLocalTime)
          ? 'Open'
          : 'Closed'}
      </Badge>
      {todayOpenTime && <span>{formatOpeningTimes(todayOpenTime)}</span>}
    </div>
  );
};

export default OpeningTime;
