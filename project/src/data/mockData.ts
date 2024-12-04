import { WeatherData, ForecastData } from '../types/weather';

export const cities: WeatherData[] = [
  {
    city: 'New York',
    temperature: 22,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=1000',
  },
  {
    city: 'London',
    temperature: 18,
    condition: 'Light Rain',
    humidity: 75,
    windSpeed: 15,
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=1000',
  },
  {
    city: 'Tokyo',
    temperature: 25,
    condition: 'Sunny',
    humidity: 55,
    windSpeed: 8,
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1000',
  },
  {
    city: 'Paris',
    temperature: 20,
    condition: 'Clear Sky',
    humidity: 60,
    windSpeed: 10,
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=1000',
  },
];

export const forecast: ForecastData[] = cities.map((city) => ({
  ...city,
  date: new Date().toISOString(),
  minTemp: city.temperature - 5,
  maxTemp: city.temperature + 5,
}));