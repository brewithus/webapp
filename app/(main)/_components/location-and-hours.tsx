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
    <div className="flex w-full px-4 flex-col sm:flex-row gap-4 font-medium">
      {/* Map container */}
      <div className="w-full flex flex-col gap-2">
        <div className="h-[300px] w-full">
          <MapContainer position={location} />
        </div>
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address.join(', '))}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-2"
        >
          <div className="group-hover:text-foreground flex text-sm flex-col">
            {address.map((a, index) => (
              <span key={index}>{a}</span>
            ))}
          </div>
          <div className="flex items-center gap-1 rounded-md bg-primary-light/50 py-2 px-4 w-fit font-semibold text-sm group-hover:text-foreground group-hover:bg-primary-light/80 h-fit">
            Get Directions
          </div>
        </a>
      </div>

      {/* Information container */}
      <div className="w-full max-w-[300px] min-w-[250px] px-2 flex flex-col gap-2 text-foreground/90 font-medium">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Clock />
            <div className="flex flex-col gap-1 w-full">
              <span>Opening hours</span>
              {(
                hours.find((h) => h.hours_type === 'REGULAR') ?? hours[0]
              ).open.map((dayHour, index) => (
                <div
                  key={index}
                  className={cn(
                    'flex items-center justify-between w-full gap-1 text-sm text-foreground/70',
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
