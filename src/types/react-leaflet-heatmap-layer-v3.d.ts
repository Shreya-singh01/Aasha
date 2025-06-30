declare module 'react-leaflet-heatmap-layer-v3' {
  import { Component } from 'react';
  
  interface HeatmapLayerProps {
    points: Array<{
      lat: number;
      lng: number;
      intensity?: number;
    }>;
    longitudeExtractor: (point: any) => number;
    latitudeExtractor: (point: any) => number;
    intensityExtractor: (point: any) => number;
    radius?: number;
    max?: number;
    blur?: number;
    fitBoundsOnLoad?: boolean;
    fitBoundsOnUpdate?: boolean;
  }
  
  export class HeatmapLayer extends Component<HeatmapLayerProps> {}
} 