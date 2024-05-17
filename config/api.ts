import axios from 'axios';

export const API_URL = process.env.API_URL ?? 'http://localhost:5050';
export const API_TOKEN = process.env.API_TOKEN ?? process.env.API_TOKEN ?? '';

export const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: API_TOKEN,
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
