import React from 'react';
import { HourlyForecast as HourlyForecastType } from '../types/weather';
import { formatTemperature } from '../utils/formatters';

interface HourlyForecastProps {
  data: HourlyForecastType[];
}

export const HourlyForecast: React.FC<HourlyForecastProps> = ({ data }) => {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-4">Hourly Forecast</h3>
      <div className="flex overflow-x-auto pb-4 gap-6">
        {data.map((hour, index) => (
          <div
            key={index}
            className="flex flex-col items-center min-w-[100px]"
          >
            <p className="text-sm text-blue-300">{hour.time}</p>
            <img
              src={`https://openweathermap.org/img/wn/${hour.icon}.png`}
              alt={hour.description}
              className="w-12 h-12 my-2 weather-icon"
            />
            <p className="font-semibold">{formatTemperature(hour.temperature)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};