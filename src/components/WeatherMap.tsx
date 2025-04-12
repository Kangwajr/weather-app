import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import { Coordinates } from '../types/weather';

interface WeatherMapProps {
  coordinates: Coordinates;
  location: string;
  temperature: number;
}

// Fix for default marker icon in react-leaflet
const defaultIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export const WeatherMap: React.FC<WeatherMapProps> = ({ coordinates, location, temperature }) => {
  return (
    <div className="glass-card rounded-2xl overflow-hidden h-[400px]">
      <MapContainer
        center={[coordinates.lat, coordinates.lon]}
        zoom={10}
        className="h-full w-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[coordinates.lat, coordinates.lon]} icon={defaultIcon}>
          <Popup>
            <div className="text-gray-900">
              <h3 className="font-bold">{location}</h3>
              <p>{temperature}°C</p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};