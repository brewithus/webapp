import React from 'react';
import { Autocomplete, useLoadScript } from '@react-google-maps/api';
import { googleMapsApiKey } from '@/config/google-maps';
import { Input } from '../ui/input';
import type { UserLocation } from '@/types/location';

interface Props {
  defaultAddress?: string;
  onSelectAddress: (address: UserLocation) => void;
}

const GoogleMapsSearchAutocomplete: React.FC<Props> = ({
  onSelectAddress,
  defaultAddress,
}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey, // Ensure your API key is correctly provided
    libraries: ['places', 'maps', 'marker', 'drawing'],
  });
  const [searchResult, setSearchResult] =
    React.useState<google.maps.places.Autocomplete>();

  // eslint-disable-next-line jsdoc/require-jsdoc
  function onLoad(autocomplete: google.maps.places.Autocomplete): void {
    setSearchResult(autocomplete);
  }
  // eslint-disable-next-line jsdoc/require-jsdoc
  function locationSelected(): void {
    if (searchResult) {
      const place = searchResult.getPlace();
      onSelectAddress({
        address: place.formatted_address ?? '',
        lat: place.geometry?.location?.lat(),
        lng: place.geometry?.location?.lng(),
      });
    }
  }

  if (!isLoaded) {
    return (
      <Input
        type="text"
        placeholder={'Loading location'}
        disabled
        className=" py-2 h-fit text-sm outline-none placeholder:text-black/50 disabled:cursor-not-allowed disabled:opacity-50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black w-full bg-white/80 cursor-pointer"
      />
    );
  }
  return (
    <Autocomplete
      onLoad={onLoad}
      onPlaceChanged={locationSelected}
      options={{ componentRestrictions: { country: 'us' } }}
      className="p-0 w-full"
    >
      <Input
        type="text"
        placeholder={defaultAddress !== '' ? defaultAddress : 'Search'}
        className="py-2 h-fit text-sm outline-none placeholder:text-black/50 disabled:cursor-not-allowed disabled:opacity-50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-black w-full bg-white/80 cursor-pointer"
      />
    </Autocomplete>
  );
};

export default GoogleMapsSearchAutocomplete;
