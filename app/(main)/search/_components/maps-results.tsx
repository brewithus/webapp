'use client';
import React, { useState, useCallback, useContext } from 'react';
import { GoogleMap, OverlayView } from '@react-google-maps/api';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { cn } from '@/lib/utils';
import { GoogleMapsContext } from '@/context/google-maps';
import type { YelpBiz } from '@/types/yelp';
import { Icons } from '@/components/icons';
import Image from 'next/image';
import { poppinsFont } from '@/styles/fonts';
import DisplayReviewStars from '../../_components/stars';

interface MapContainerProps {
  bizList: YelpBiz[];
  position: { lat: number; lng: number }; // position prop for latitude and longitude
  className?: string;
}

const containerStyle = {
  width: '100%',
  height: '100%',
  borderRadius: '4px',
};

const MapResults: React.FC<MapContainerProps> = ({
  className,
  position,
  bizList,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const { isLoaded } = useContext(GoogleMapsContext);
  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const getBizMarker = (biz: YelpBiz): { lat: number; lng: number } => {
    return {
      lat: biz.coordinates.latitude,
      lng: biz.coordinates.longitude,
    };
  };

  return isLoaded ? (
    <div className={cn('h-full w-full', className)}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position}
        onLoad={(map) => {
          const bounds = new window.google.maps.LatLngBounds(position);
          for (let i = 0; i < bizList.length; i++) {
            bounds.extend(
              new window.google.maps.LatLng(getBizMarker(bizList[i])),
            );
          }
          map.fitBounds(bounds);
        }}
        onUnmount={onUnmount}
        options={{ maxZoom: 18 }}
      >
        {/* Child components, such as markers, info windows, etc. */}
        {/* {bizList.map((biz, index) => (
          <Marker
            key={index}
            position={{
              lat: biz.coordinates.latitude,
              lng: biz.coordinates.longitude,
            }}
          />
        ))} */}
        {bizList.map((biz, index) => (
          <OverlayView
            key={index}
            position={{
              lat: biz.coordinates.latitude,
              lng: biz.coordinates.longitude,
            }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
          >
            <div className="-translate-x-[15px] -translate-y-[28px]">
              <CustomMapPin biz={biz} index={index} />
            </div>
          </OverlayView>
        ))}
      </GoogleMap>
    </div>
  ) : (
    <div
      className={cn(
        'text-md flex h-[300px] w-[300px] items-center text-center font-medium',
        className,
      )}
    >
      Loading maps
    </div>
  );
};

export default MapResults;

interface MapPinProps {
  biz: YelpBiz;
  index: number;
}

const CustomMapPin: React.FC<MapPinProps> = ({ index, biz }) => {
  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger>
          <div className="relative">
            <Icons.mapPin className="cursor-pointer text-primary" size={32} />
            {/* <div className="text-primary-foreground bg-primary w-fit px-1 text-xs font-extrabold h-fit rounded-full absolute top-1 left-2 text-center">
              {index + 1}
            </div> */}
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-2">
            <div className="w-full">
              <Image
                src={biz.image_url ?? '/icon.png'}
                alt="res logo"
                width={1024}
                height={1024}
                className="h-[150px] w-full rounded-sm object-cover"
              />
            </div>
            <div>
              <a
                href={`/business/${biz.id}`}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  'cursor-pointer text-xl font-bold hover:underline',
                  poppinsFont.className,
                )}
              >
                {biz.name}
              </a>
              <DisplayReviewStars
                rating={biz.rating ?? 0}
                className="gap-[1px] text-primary"
              />
              <div className="flex items-center gap-1 font-medium">
                {biz.rating ? (
                  <>
                    <span>{biz.rating}</span>
                    <span className="text-foreground/70">
                      ({biz.review_count} reviews)
                    </span>
                  </>
                ) : (
                  'No reviews yet'
                )}
              </div>
              <div className="text-sm font-medium"></div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
