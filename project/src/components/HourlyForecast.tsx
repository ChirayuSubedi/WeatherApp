import React from 'react';
import { format } from 'date-fns';
import { Cloud, Sun, CloudRain, CloudSnow } from 'lucide-react';
import { useWeatherStore } from '../store/weatherStore';

interface HourlyForecastProps {
  cityName: string;
  forecast: any;
}

const getWeatherIcon = (condition: string) => {
  switch (condition.toLowerCase()) {
    case 'clear':
      return <Sun className="w-8 h-8 text-yellow-500" />;
    case 'clouds':
      return <Cloud className="w-8 h-8 text-gray-500" />;
    case 'rain':
      return <CloudRain className="w-8 h-8 text-blue-500" />;
    case 'snow':
      return <CloudSnow className="w-8 h-8 text-blue-300" />;
    default:
      return <Sun className="w-8 h-8 text-yellow-500" />;
  }
};

export function HourlyForecast({ cityName, forecast }: HourlyForecastProps) {
  const { convertTemperature, settings } = useWeatherStore();

  const hourlyData = forecast.list.slice(0, 24);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Hourly Forecast - {cityName}
      </h3>
      <div className="overflow-x-auto">
        <div className="inline-flex space-x-4 min-w-full pb-4">
          {hourlyData.map((hour: any, index: number) => (
            <div
              key={index}
              className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg min-w-[100px]"
            >
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {format(new Date(hour.dt * 1000), 'HH:mm')}
              </span>
              {getWeatherIcon(hour.weather[0].main)}
              <span className="text-lg font-semibold mt-2">
                {Math.round(convertTemperature(hour.main.temp))}°
                {settings.units === 'celsius' ? 'C' : 'F'}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {hour.weather[0].description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}