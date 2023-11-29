import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { ReactNode, useEffect, useState } from "react";
import { LatLng } from "./SelectLocation";

interface GMapProps {
  zoom?: number;
  center?: { lat: number; lng: number };
  height?: number | string;
  width?: number | string;
  children?: ReactNode;
  onLoad?: (bounds: google.maps.LatLngBounds) => void;
  locations?: LatLng[];
}

function GMap(props: GMapProps) {
  const {
    zoom,
    center,
    height,
    width,
    children,
    onLoad: onLoadMap,
    locations,
  } = props;

  /// Map state
  const [map, setMap] = useState<google.maps.Map | null>(null);

  /// Listen locations
  useEffect(() => {
    if (!locations || !map) return;
    const bounds = new window.google.maps.LatLngBounds();
    for (const location of locations) bounds.extend(location);
    map.fitBounds(bounds);
  }, [locations]);

  /// Load map
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_KEY,
  });
  if (!isLoaded) return <></>;

  /// Load map
  const onLoad = async (map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds();
    onLoadMap?.(bounds);
    map.fitBounds(bounds);
    setMap(map);
  };

  return (
    <GoogleMap
      mapContainerStyle={{ height, width }}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      children={children}
    />
  );
}

export default GMap;
