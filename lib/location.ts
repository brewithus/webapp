import type { UserLocation } from '@/types/location'; // Correctly using import type

/**
 * Asynchronously fetches geographic coordinates from a given address using the Google Maps Geocoding API.
 * @param {string} apiKey - The API key for authenticating requests to the Google Maps API.
 * @param {string} address - The address from which to fetch geographic coordinates.
 * @returns {Promise<UserLocation>} A promise that resolves with the UserLocation object containing latitude, longitude, and address.
 * @throws {Error} If the geocoding process fails or if the API request fails.
 */
export async function getCoordinatesFromAddress(
  apiKey: string,
  address: string,
): Promise<UserLocation> {
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === 'OK') {
      const { lat, lng } = data.results[0].geometry.location;
      return { lat, lng, address };
    } else {
      throw new Error(`Geocoding failed: ${data.status}`);
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error);
    throw error;
  }
}

/**
 * Parses a string to extract user location details.
 * @param {string} str - The string containing user location data formatted as "address|latitude|longitude".
 * @returns {UserLocation} An object representing the user's location including address, latitude, and longitude.
 */
export function getUserLocationFromString(str: string): UserLocation {
  const data = str.split('|');
  return {
    address: data[0],
    lat: Number(data[1]),
    lng: Number(data[2]),
  };
}

/**
 * Serializes a UserLocation object into a string format.
 * @param {UserLocation} location - The user location object to serialize.
 * @returns {string} A string representation of the user location, formatted as "address|latitude|longitude".
 */
export function userLocationToString(location: UserLocation): string {
  return `${location.address}|${location.lat}|${location.lng}`;
}
