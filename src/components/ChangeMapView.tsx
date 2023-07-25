import { LatLngLiteral } from 'leaflet'
import React from 'react'
import { useMap } from 'react-leaflet';

interface ChangeMapViewProps {
  center: LatLngLiteral,
  zoom?: number
}

const ChangeMapView = ({ center, zoom = 5 }: ChangeMapViewProps) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

export default ChangeMapView