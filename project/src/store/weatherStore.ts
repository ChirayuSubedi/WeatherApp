import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchWeather, fetchForecast } from '../services/api';
import { DEFAULT_CITIES } from '../config/constants';

interface WeatherState {
  currentWeather: Record<string, any>;
  forecast: Record<string, any>;
  loading: boolean;
  error: string | null;
  settings: {
    units: 'celsius' | 'fahrenheit';
    theme: 'light' | 'dark';
    notifications: boolean;
    refreshInterval: number;
  };
  fetchAllWeatherData: () => Promise<void>;
  updateSettings: (settings: Partial<WeatherState['settings']>) => void;
  convertTemperature: (temp: number) => number;
}

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set, get) => ({
      currentWeather: {},
      forecast: {},
      loading: false,
      error: null,
      settings: {
        units: 'celsius',
        theme: 'light',
        notifications: true,
        refreshInterval: 30,
      },

      fetchAllWeatherData: async () => {
        set({ loading: true, error: null });
        try {
          const weatherPromises = DEFAULT_CITIES.map(async (city) => {
            const weather = await fetchWeather(city.lat, city.lon);
            const forecast = await fetchForecast(city.lat, city.lon);
            return { city: city.name, weather, forecast };
          });

          const results = await Promise.all(weatherPromises);
          
          const currentWeather = {};
          const forecast = {};
          
          results.forEach((result) => {
            currentWeather[result.city] = result.weather;
            forecast[result.city] = result.forecast;
          });

          set({ currentWeather, forecast, loading: false });
        } catch (error) {
          set({ error: 'Failed to fetch weather data', loading: false });
        }
      },

      updateSettings: (newSettings) => {
        set((state) => {
          const updatedSettings = {
            settings: { ...state.settings, ...newSettings },
          };

          // Apply theme changes
          if (newSettings.theme) {
            document.documentElement.classList.remove('dark', 'light');
            document.documentElement.classList.add(newSettings.theme);
          }

          // Handle notifications
          if (newSettings.notifications !== undefined) {
            if (newSettings.notifications) {
              Notification.requestPermission();
            }
          }

          return updatedSettings;
        });
      },

      convertTemperature: (temp: number) => {
        const { units } = get().settings;
        if (units === 'fahrenheit') {
          return (temp * 9/5) + 32;
        }
        return temp;
      },
    }),
    {
      name: 'weather-storage',
      partialize: (state) => ({ settings: state.settings }),
    }
  )
);