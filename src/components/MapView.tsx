import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import {HeatmapLayer} from 'react-leaflet-heatmap-layer-v3'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Props interface
interface RedZone {
  _id: string;
  name: string;
  location: string;
  riskLevel: "high" | "medium" | "low";
  lastReport: string;
  activeCases: number;
  description: string;
  coordinates: { lat: number; lng: number };
}

interface MapProps {
  zones: RedZone[]
}

interface HeatDataPoint {
  lat: number;
  lng: number;
  intensity: number;
}

// Default icon for markers
const markerIcon = new Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34]
})

// Custom risk-based marker icons
const getRiskIcon = (riskLevel: string) => {
  const color = riskLevel === 'high' ? 'red' : riskLevel === 'medium' ? 'orange' : 'green';
  return new Icon({
    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-${color}.png`,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34]
  });
};

const MapView: React.FC<MapProps> = ({ zones }) => {
  const heatData: HeatDataPoint[] = zones.map(zone => ({
    lat: zone.coordinates.lat,
    lng: zone.coordinates.lng,
    intensity: zone.riskLevel === 'high' ? 1 : zone.riskLevel === 'medium' ? 0.6 : 0.3
  }))

  return (
    <MapContainer
      center={[22.9734, 78.6569]} // India center coordinates
      zoom={5}
      scrollWheelZoom={true}
      className="w-full h-full z-0"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {/* Heatmap Layer */}
      <HeatmapLayer
        fitBoundsOnLoad
        fitBoundsOnUpdate
        points={heatData}
        longitudeExtractor={(p: HeatDataPoint) => p.lng}
        latitudeExtractor={(p: HeatDataPoint) => p.lat}
        intensityExtractor={(p: HeatDataPoint) => p.intensity}
        radius={20}
        max={1}
        blur={20}
      />

      {/* Markers for each zone */}
      {zones.map(zone => (
        <Marker
          key={zone._id}
          position={[zone.coordinates.lat, zone.coordinates.lng]}
          icon={getRiskIcon(zone.riskLevel)}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-bold text-lg">{zone.name}</h3>
              <p className="text-sm text-gray-600">{zone.location}</p>
              <div className="mt-2">
                <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                  zone.riskLevel === 'high' ? 'bg-red-100 text-red-800' :
                  zone.riskLevel === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {zone.riskLevel.toUpperCase()} RISK
                </span>
              </div>
              <div className="mt-2 text-sm">
                <p><strong>Active Cases:</strong> {zone.activeCases}</p>
                <p><strong>Last Report:</strong> {zone.lastReport}</p>
              </div>
              <p className="mt-2 text-xs text-gray-500">{zone.description}</p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

export default MapView
