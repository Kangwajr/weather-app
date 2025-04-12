import React from 'react';
import { Sunrise, Sunset, Eye, Gauge } from 'lucide-react';
import { WeatherData } from '../types/weather';
import { formatTime } from '../utils/formatters';

interface WeatherDetailsProps {
  data: WeatherData;
}

export const WeatherDetails: React.FC<WeatherDetailsProps> = ({ data }) => {
  return (
    <div className="glass-card rounded-2xl p-6">
      <h3 className="text-xl font-semibold mb-4">Weather Details</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-500/10">
            <Sunrise className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Sunrise</p>
            <p className="font-medium">{formatTime(data.sunrise)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-500/10">
            <Sunset className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Sunset</p>
            <p className="font-medium">{formatTime(data.sunset)}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-500/10">
            <Eye className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Visibility</p>
            <p className="font-medium">{(data.visibility / 1000).toFixed(1)} km</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-blue-500/10">
            <Gauge className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Pressure</p>
            <p className="font-medium">{data.pressure} hPa</p>
          </div>
        </div>
      </div>
    </div>
  );
};