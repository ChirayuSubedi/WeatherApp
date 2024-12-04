import axios from 'axios';
import { API_KEY, API_BASE_URL } from '../config/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  params: {
    appid: API_KEY,
  },
});

export const fetchWeather = async (lat: number, lon: number) => {
  const response = await api.get('/weather', {
    params: { lat, lon, units: 'metric' },
  });
  return response.data;
};

export const fetchForecast = async (lat: number, lon: number) => {
  const response = await api.get('/forecast', {
    params: { lat, lon, units: 'metric' },
  });
  return response.data;
};