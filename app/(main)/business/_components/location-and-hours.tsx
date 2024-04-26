'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { rubikFont } from '@/styles/fonts';
import MapContainer from './google-map';
import { Globe, MapPin, Phone } from 'lucide-react';

interface LocationsProps {
  id: string;
  address: string;
  hours: string;
  phone: string;
  location?: { lat: number; lng: number }; // position prop for latitude and longitude
}

/**
 * Loads a Google Map instance with a marker.
 * @param {LocationsProps} props The component props.
 * @returns {JSX.Element} The component element.
 */
export default function Locations({
  id,
  address,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  hours,
  phone,
  location,
}: LocationsProps): JSX.Element {
  return (
    <div className="flex flex-col gap-2">
      <div
        id="biz-location"
        className="flex self-start items-center gap-2 justify-between p-4 w-full border-b"
      >
        <p
          className={cn(
            'text-3xl font-bold text-center text-foreground/90',
            rubikFont.className,
          )}
        >
          Location & Hours
        </p>
      </div>
      <div className="flex w-full px-4 flex-col sm:flex-row gap-4">
        {/* Map container */}
        <div className="w-full flex flex-col gap-2">
          <div className="h-[300px] w-full">
            <MapContainer position={location} />
          </div>
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-1"
          >
            <div className="group-hover:text-foreground flex items-center gap-2">
              <MapPin />
              {address}
            </div>
            <div className="flex items-center gap-1 rounded-md bg-primary-light/50 py-2 px-4 w-fit font-semibold text-sm group-hover:text-foreground group-hover:bg-primary-light/80">
              Get Directions
            </div>
          </a>
        </div>

        {/* Information container */}
        <div className="w-full max-w-[300px] min-w-[250px] px-2 flex flex-col gap-2 justify-center text-foreground/70">
          <a
            href={'#'}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground/80"
          >
            <div className="flex items-center gap-2">
              <Globe />
              {id + '.com'}
            </div>
          </a>

          <div className="flex items-center gap-2">
            <Phone />
            {phone}
          </div>
        </div>
      </div>
    </div>
  );
}
