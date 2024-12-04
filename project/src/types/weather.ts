export interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  image: string;
}

export interface ForecastData extends WeatherData {
  date: string;
  minTemp: number;
  maxTemp: number;
}