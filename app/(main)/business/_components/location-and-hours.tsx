'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { rubikFont } from '@/styles/fonts';
import MapContainer from './google-map';

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
}: LocationsProps): JSX.Element {
  return (
    <div className="flex flex-col gap-2">
      <p
        className={cn(
          'text-3xl font-bold text-center p-4 w-full border-b',
          rubikFont.className,
        )}
      >
        Location & Hours
      </p>
      <div className="flex w-full px-4 flex-col sm:flex-row">
        {/* Map container */}
        <div className="h-[300px] w-full">
          <MapContainer />
        </div>

        {/* Information container */}
        <div
          className="min-w-[250px]"
          style={{
            padding: '20px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            maxWidth: '300px',
            margin: '20px',
          }}
        >
          <a
            href={`http://${id}.com`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px',
              }}
            >
              <span style={{ marginRight: '8px' }}>🔗</span>
              {id + '.com'}
            </div>
          </a>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '16px',
            }}
          >
            <span style={{ marginRight: '8px' }}>📞</span>
            {phone}
          </div>

          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: '16px',
              }}
            >
              <span style={{ marginRight: '8px' }}>📍</span>
              Get Directions
            </div>
            <p style={{ margin: '0' }}>{address}</p>
          </a>
        </div>
      </div>
    </div>
  );
}
