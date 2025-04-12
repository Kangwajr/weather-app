import React, { useState, useEffect } from 'react';
import { Cloud } from 'lucide-react';
import { SearchBar } from './components/SearchBar';
import { CurrentWeather } from './components/CurrentWeather';
import { ForecastCard } from './components/ForecastCard';
import { WeatherMap } from './components/WeatherMap';
import { HourlyForecast } from './components/HourlyForecast';
import { WeatherDetails } from './components/WeatherDetails';
import { WeatherData, ForecastData, HourlyForecast as HourlyForecastType } from './types/weather';
import { getWeather, getForecast } from './utils/api';

const DEFAULT_CITY = 'London';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [hourlyForecast, setHourlyForecast] = useState<HourlyForecastType[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchWeatherData(DEFAULT_CITY);
  }, []);

  const fetchWeatherData = async (city: string) => {
    try {
      setLoading(true);
      setError('');
      const weatherData = await getWeather(city);
      const forecastData = await getForecast(city);
      setWeather(weatherData);
      setForecast(forecastData.daily);
      setHourlyForecast(forecastData.hourly);
    } catch (err) {
      setError('City not found. Please try again.');
      setWeather(null);
      setForecast([]);
      setHourlyForecast([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center mb-12">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-full bg-blue-500/10">
              <Cloud className="h-8 w-8 text-blue-400" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              Weather Forecast
            </h1>
          </div>

          <SearchBar onSearch={fetchWeatherData} />

          {error && (
            <div className="mt-4 text-red-400 bg-red-400/10 px-4 py-2 rounded-lg animate-fade-in">
              {error}
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center">
            <div className="glass-card rounded-xl p-6 animate-pulse">
              <div className="flex items-center gap-4">
                <div className="h-8 w-8 rounded-full bg-blue-400/20"></div>
                <div className="h-4 w-48 rounded bg-blue-400/20"></div>
              </div>
            </div>
          </div>
        ) : (
          weather && (
            <div className="space-y-8 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <CurrentWeather data={weather} />
                <WeatherMap
                  coordinates={weather.coordinates}
                  location={weather.location}
                  temperature={weather.temperature}
                />
              </div>

              <WeatherDetails data={weather} />
              
              <HourlyForecast data={hourlyForecast} />

              <div>
                <h2 className="text-2xl font-bold mb-6">5-Day Forecast</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                  {forecast.map((day, index) => (
                    <ForecastCard key={index} data={day} index={index} />
                  ))}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;