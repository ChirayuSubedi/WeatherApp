import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useWeatherStore } from '../store/weatherStore';
import { useWeatherRefresh } from '../hooks/useWeatherRefresh';
import { DEFAULT_CITIES } from '../config/constants';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import 'leaflet/dist/leaflet.css';

export function Maps() {
  const { currentWeather, loading, error } = useWeatherStore();
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Weather Map</h2>
      <div className="h-[600px] rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          center={[20, 0]}
          zoom={2}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {DEFAULT_CITIES.map((city) => (
            <Marker
              key={city.name}
              position={[city.lat, city.lon]}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{city.name}</h3>
                  {currentWeather[city.name] && (
                    <>
                      <p>{currentWeather[city.name].main.temp}°C</p>
                      <p>{currentWeather[city.name].weather[0].description}</p>
                    </>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}