'use client';

import React, { useState } from 'react';
import MultiSelectCombobox from './TagsSelection';
import { Separator } from '../ui/separator';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import GoogleSearchAutocomplete from './autocomplete';
import type { UserLocation } from '@/types/location';
import {
  getUserLocationFromString,
  userLocationToString,
} from '@/lib/location';

const FindCoffeeSpot: React.FC<{ className?: string }> = ({
  className,
}): JSX.Element => {
  const router = useRouter();

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // state to store the selected address details
  const [selectedAddress, setSelectedAddress] = useState<UserLocation | null>(
    null,
  );

  // Define the handleSelectAddress function
  const handleSelectAddress = (address: UserLocation): void => {
    // Update the state with the new address and its lat/lng
    setSelectedAddress(address);
    localStorage.setItem('lastSelectedAddress', userLocationToString(address));
  };

  const handleFindCoffeeSpotsClick = (): void => {
    if (!selectedAddress) {
      // Alert the user to select a location first
      alert('Please select a location first.');
      return;
    }

    // Construct the query params string
    const queryParams = new URLSearchParams({
      lat: String(selectedAddress.lat),
      lng: String(selectedAddress.lng),
      tags: selectedTags.join(','),
    }).toString();

    // Redirect to the /search page with query params
    router.push(`/search?${queryParams}`);
  };

  React.useEffect(() => {
    const lastSelected: string | null = localStorage.getItem(
      'lastSelectedAddress',
    );

    if (lastSelected) {
      setSelectedAddress(getUserLocationFromString(lastSelected));
    }
  }, []);

  return (
    <div className={cn('w-full flex flex-col items-start gap-4', className)}>
      <div className="flex flex-col gap-1 items-start rounded-lg w-full h-fit">
        <div className="flex-1 w-full px-4 bg-white/80 rounded-lg">
          <MultiSelectCombobox
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
          />
        </div>
        <Separator className="bg-white/50" />
        {/* <PlacesAutocomplete onSelectAddress={handleSelectAddress} /> */}
        <GoogleSearchAutocomplete
          onSelectAddress={handleSelectAddress}
          defaultAddress={selectedAddress?.address}
        />
      </div>
      <Button className="font-bold" onClick={handleFindCoffeeSpotsClick}>
        Find Coffee Spots
      </Button>
    </div>
  );
};

export default FindCoffeeSpot;
