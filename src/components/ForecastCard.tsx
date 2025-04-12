import React from 'react';
import { ForecastData } from '../types/weather';
import { formatTemperature } from '../utils/formatters';

interface ForecastCardProps {
  data: ForecastData;
  index: number;
}

export const ForecastCard: React.FC<ForecastCardProps> = ({ data, index }) => {
  return (
    <div 
      className="glass-card rounded-2xl p-6 text-center transition-all duration-300 hover:transform hover:scale-105"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <p className="text-blue-300 font-medium mb-3">{data.date}</p>
      <div className="relative">
        <img
          src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
          alt={data.description}
          className="w-20 h-20 mx-auto weather-icon"
        />
      </div>
      <p className="text-3xl font-bold text-white mb-2">
        {formatTemperature(data.temperature)}
      </p>
      <p className="text-blue-200/80 text-sm capitalize">{data.description}</p>
      <div className="mt-3 pt-3 border-t border-gray-700/50">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-400">Humidity</p>
            <p className="font-medium">{data.humidity}%</p>
          </div>
          <div>
            <p className="text-gray-400">Wind</p>
            <p className="font-medium">{data.windSpeed} m/s</p>
          </div>
        </div>
      </div>
    </div>
  );
};