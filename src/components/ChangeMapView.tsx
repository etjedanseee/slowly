import { LatLngLiteral } from 'leaflet'
import React from 'react'
import { useMap } from 'react-leaflet';

interface ChangeMapViewProps {
  center: LatLngLiteral,
}

const ChangeMapView = ({ center }: ChangeMapViewProps) => {
  const map = useMap();
  map.setView(center);
  return null;
}

export default ChangeMapView