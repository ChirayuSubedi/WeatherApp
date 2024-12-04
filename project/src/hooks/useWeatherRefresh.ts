import { useEffect } from 'react';
import { useWeatherStore } from '../store/weatherStore';

export function useWeatherRefresh() {
  const { fetchAllWeatherData, settings } = useWeatherStore();

  useEffect(() => {
    fetchAllWeatherData();

    const interval = setInterval(() => {
      fetchAllWeatherData();
    }, settings.refreshInterval * 1000);

    return () => clearInterval(interval);
  }, [settings.refreshInterval]);
}