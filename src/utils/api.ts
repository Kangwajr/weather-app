import axios from 'axios';
import { WeatherData, ForecastData, HourlyForecast } from '../types/weather';

const API_KEY = '4bc43ecafff40cbdc673eef947b2d5c0'; // In production, this should be in environment variables
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const getWeather = async (city: string): Promise<WeatherData> => {
  const response = await axios.get(
    `${BASE_URL}/weather?q=${city}&units=metric&appid=${API_KEY}`
  );
  
  return {
    location: response.data.name,
    temperature: Math.round(response.data.main.temp),
    description: response.data.weather[0].description,
    humidity: response.data.main.humidity,
    windSpeed: response.data.wind.speed,
    icon: response.data.weather[0].icon,
    coordinates: {
      lat: response.data.coord.lat,
      lon: response.data.coord.lon,
    },
    feelsLike: Math.round(response.data.main.feels_like),
    pressure: response.data.main.pressure,
    visibility: response.data.visibility,
    sunrise: response.data.sys.sunrise,
    sunset: response.data.sys.sunset,
  };
};

export const getForecast = async (city: string): Promise<{
  daily: ForecastData[];
  hourly: HourlyForecast[];
}> => {
  const response = await axios.get(
    `${BASE_URL}/forecast?q=${city}&units=metric&appid=${API_KEY}`
  );
  
  const hourly = response.data.list.slice(0, 8).map((item: any) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
    temperature: Math.round(item.main.temp),
    icon: item.weather[0].icon,
    description: item.weather[0].description,
  }));

  const daily = response.data.list
    .filter((_: any, index: number) => index % 8 === 0)
    .map((item: any) => ({
      date: new Date(item.dt * 1000).toLocaleDateString(),
      temperature: Math.round(item.main.temp),
      description: item.weather[0].description,
      humidity: item.main.humidity,
      windSpeed: item.wind.speed,
      icon: item.weather[0].icon,
      location: response.data.city.name,
      precipitation: item.pop * 100,
    }));

  return { daily, hourly };
};