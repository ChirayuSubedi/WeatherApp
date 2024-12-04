import React from 'react';
import { WeatherCard } from '../components/WeatherCard';
import { HourlyForecast } from '../components/HourlyForecast';
import { WeatherMetrics } from '../components/WeatherMetrics';
import { SearchBar } from '../components/SearchBar';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { useWeatherStore } from '../store/weatherStore';
import { useWeatherRefresh } from '../hooks/useWeatherRefresh';
import { DEFAULT_CITIES } from '../config/constants';

export function Dashboard() {
  const { currentWeather, forecast, loading, error } = useWeatherStore();
  useWeatherRefresh();

  if (loading && Object.keys(currentWeather).length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <SearchBar />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Current Weather</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEFAULT_CITIES.map((city) => (
            <WeatherCard
              key={city.name}
              data={{
                city: city.name,
                ...currentWeather[city.name],
              }}
            />
          ))}
        </div>
      </div>

      {DEFAULT_CITIES.map((city) => (
        <React.Fragment key={`${city.name}-metrics`}>
          {currentWeather[city.name] && (
            <>
              <WeatherMetrics data={currentWeather[city.name]} />
              <HourlyForecast
                cityName={city.name}
                forecast={forecast[city.name]}
              />
            </>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}