export interface Coordinates {
  lat: number;
  lon: number;
}

export interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  coordinates: Coordinates;
  feelsLike: number;
  pressure: number;
  visibility: number;
  sunrise: number;
  sunset: number;
}

export interface ForecastData extends Omit<WeatherData, 'coordinates'> {
  date: string;
  precipitation: number;
}

export interface HourlyForecast {
  time: string;
  temperature: number;
  icon: string;
  description: string;
}