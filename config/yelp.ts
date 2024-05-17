import axios from 'axios';

const YELP_API_TOKEN =
  process.env.NEXT_PUBLIC_YELP_API_TOKEN ?? process.env.YELP_API_TOKEN ?? '';

export const yelpApiClient = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3',
  headers: {
    Authorization: `Bearer ${YELP_API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});
