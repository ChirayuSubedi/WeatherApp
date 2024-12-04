import React from 'react';
import { Droplets, Wind, Gauge, Sun, Sunset } from 'lucide-react';
import { format } from 'date-fns';

interface WeatherMetricsProps {
  data: any;
}

export function WeatherMetrics({ data }: WeatherMetricsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
        <div className="flex items-center gap-2">
          <Droplets className="w-5 h-5 text-blue-500" />
          <span className="text-gray-600 dark:text-gray-300">Humidity</span>
        </div>
        <p className="text-2xl font-semibold mt-2">{data.main.humidity}%</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
        <div className="flex items-center gap-2">
          <Wind className="w-5 h-5 text-blue-500" />
          <span className="text-gray-600 dark:text-gray-300">Wind Speed</span>
        </div>
        <p className="text-2xl font-semibold mt-2">{Math.round(data.wind.speed)} km/h</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
        <div className="flex items-center gap-2">
          <Gauge className="w-5 h-5 text-blue-500" />
          <span className="text-gray-600 dark:text-gray-300">Pressure</span>
        </div>
        <p className="text-2xl font-semibold mt-2">{data.main.pressure} hPa</p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg">
        <div className="flex items-center gap-2">
          <Sun className="w-5 h-5 text-blue-500" />
          <span className="text-gray-600 dark:text-gray-300">UV Index</span>
        </div>
        <p className="text-2xl font-semibold mt-2">
          {Math.round(data.main.temp_max - data.main.temp_min)}
        </p>
      </div>
    </div>
  );
}