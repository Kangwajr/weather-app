import React from 'react';
import { Droplets, Wind, MapPin } from 'lucide-react';
import { WeatherData } from '../types/weather';
import { formatTemperature } from '../utils/formatters';

interface CurrentWeatherProps {
  data: WeatherData;
}

export const CurrentWeather: React.FC<CurrentWeatherProps> = ({ data }) => {
  return (
    <div className="glass-card rounded-3xl p-8 animate-fade-in">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        <div className="text-center md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-5 w-5 text-blue-400" />
            <h2 className="text-3xl font-bold text-white">{data.location}</h2>
          </div>
          <p className="text-blue-200/80 capitalize text-lg">{data.description}</p>
          <div className="mt-4">
            <div className="text-7xl font-bold text-white tracking-tight">
              {formatTemperature(data.temperature)}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-center">
          <img
            src={`https://openweathermap.org/img/wn/${data.icon}@4x.png`}
            alt={data.description}
            className="w-32 h-32 weather-icon"
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-6">
        <div className="glass-card rounded-2xl p-4 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-500/10">
            <Droplets className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Humidity</p>
            <p className="text-xl font-semibold">{data.humidity}%</p>
          </div>
        </div>
        <div className="glass-card rounded-2xl p-4 flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-500/10">
            <Wind className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Wind Speed</p>
            <p className="text-xl font-semibold">{data.windSpeed} m/s</p>
          </div>
        </div>
      </div>
    </div>
  );
};