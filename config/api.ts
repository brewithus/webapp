import axios from 'axios';

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5050';
export const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN ?? '';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: API_TOKEN,
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});