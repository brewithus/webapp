'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import MapContainer from './google-map';
import { Clock, Phone } from 'lucide-react';
import { type Hour } from '@/types/yelp';
import {
  formatOpeningTimes,
  getWeekDayString,
  reverseGeocodingWithGoogle,
} from '../_utils/time-helpers';

interface LocationsProps {
  id: string;
  address: string[];
  hours: Hour[];
  phone: string;
  location: { lat: number; lng: number }; // position prop for latitude and longitude
}

/**
 * Loads a Google Map instance with a marker.
 * @param {LocationsProps} props The component props.
 * @returns {JSX.Element} The component element.
 */
export default function Locations({
  id,
  address,
  hours,
  phone,
  location,
}: LocationsProps): JSX.Element {
  const [bizLocalTime, setBizLocalTime] = React.useState(new Date());

  React.useEffect(() => {
    reverseGeocodingWithGoogle(location.lat, location.lng)
      .then((time) => {
        if (time) {
          setBizLocalTime(time);
        }
      })
      .catch((e) => {});
  }, [location]);

  return (
    <div className="flex w-full flex-col gap-4 px-4 font-medium sm:flex-row">
      {/* Map container */}
      <div className="flex w-full flex-col gap-2">
        <div className="h-[300px] w-full">
          <MapContainer position={location} />
        </div>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address.join(', '))}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-2"
        >
          <div className="flex flex-col text-sm group-hover:text-foreground">
            {address.map((a, index) => (
              <span key={index}>{a}</span>
            ))}
          </div>
          <div className="flex h-fit w-fit items-center gap-1 rounded-md bg-primary-light/50 px-4 py-2 text-sm font-semibold group-hover:bg-primary-light/80 group-hover:text-foreground">
            Get Directions
          </div>
        </a>
      </div>

      {/* Information container */}
      <div className="flex w-full min-w-[250px] max-w-[300px] flex-col gap-2 px-2 font-medium text-foreground/90">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Clock />
            <div className="flex w-full flex-col gap-1">
              <span>Opening hours</span>
              {(
                hours.find((h) => h.hours_type === 'REGULAR') ?? hours[0]
              ).open.map((dayHour, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex w-full items-center justify-between gap-1 text-sm text-foreground/70',
                    bizLocalTime.getDay() === dayHour.day && 'text-foreground',
                  )}
                >
                  <span>{getWeekDayString(dayHour.day)}</span>
                  {formatOpeningTimes(dayHour)}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Phone />
          {phone}
        </div>
      </div>
    </div>
  );
}
