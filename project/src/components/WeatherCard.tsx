import React from 'react';
import { Cloud, Droplets, Wind, ArrowUp, ArrowDown } from 'lucide-react';
import { useWeatherStore } from '../store/weatherStore';
import { WeatherData, ForecastData } from '../types/weather';

interface WeatherCardProps {
  data: WeatherData | ForecastData;
  showForecast?: boolean;
}

export function WeatherCard({ data, showForecast = false }: WeatherCardProps) {
  const { convertTemperature, settings } = useWeatherStore();
  const isForecast = 'minTemp' in data;

  const displayTemp = (temp: number) => {
    const converted = convertTemperature(temp);
    return `${Math.round(converted)}°${settings.units === 'celsius' ? 'C' : 'F'}`;
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02] cursor-pointer`}>
      <div 
        className="h-32 bg-cover bg-center"
        style={{ backgroundImage: `url(${data.image})` }}
      />
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{data.city}</h3>
        <div className="mt-2">
          <div className="text-3xl font-bold text-gray-900 dark:text-white">
            {displayTemp(data.temperature)}
          </div>
          <p className="text-gray-600 dark:text-gray-300 mt-1">{data.condition}</p>
          {isForecast && showForecast && (
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center text-red-500">
                <ArrowUp size={16} />
                <span>{displayTemp((data as ForecastData).maxTemp)}</span>
              </div>
              <div className="flex items-center text-blue-500">
                <ArrowDown size={16} />
                <span>{displayTemp((data as ForecastData).minTemp)}</span>
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 flex items-center gap-4 text-gray-600 dark:text-gray-300">
          <div className="flex items-center gap-1">
            <Droplets size={18} className="text-blue-500" />
            <span>{data.humidity}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Wind size={18} className="text-blue-500" />
            <span>{data.windSpeed} km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
}