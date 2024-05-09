'use client';

import React, { useState } from 'react';

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
import { Input } from '../ui/input';
import { toast } from 'sonner';

interface Props {
  className?: string;
  defaultQuery?: string;
}

const FindCoffeeSpot: React.FC<Props> = ({
  defaultQuery,
  className,
}): JSX.Element => {
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // state to store the selected address details
  const [selectedAddress, setSelectedAddress] = useState<UserLocation | null>(
    null,
  );

  const [searchQuery, setSearchQuery] = useState<string>(defaultQuery ?? '');
  // Define the handleSelectAddress function
  const handleSelectAddress = (address: UserLocation): void => {
    // Update the state with the new address and its lat/lng
    setSelectedAddress(address);
    localStorage.setItem('lastSelectedAddress', userLocationToString(address));
  };

  const handleFindCoffeeSpotsClick = (): void => {
    if (!selectedAddress) {
      // Alert the user to select a location first
      toast.error('Please select a location first.');
      return;
    }
    if (!searchQuery) {
      toast.error('Please enter your search query');
      return;
    }

    // Construct the query params string
    const queryParams = new URLSearchParams({
      lat: String(selectedAddress.lat),
      lng: String(selectedAddress.lng),
      q: searchQuery,
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
    <div className={cn('flex w-full flex-col items-start gap-4', className)}>
      <div className="flex h-fit w-full flex-col items-start gap-1 rounded-lg">
        <div className="w-full flex-1 rounded-lg bg-white/80">
          <Input
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleFindCoffeeSpotsClick();
              }
            }}
            className="bg-transparent px-4 text-black"
            placeholder="Enter your search here "
          />
          {/* <MultiSelectCombobox
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
          /> */}
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
