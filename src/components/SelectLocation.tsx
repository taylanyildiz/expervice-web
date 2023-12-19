import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";

export type LatLng = { lat: number; lng: number };

interface SelectLocationProps {
  value: LatLng | null;
  onChanged: (latLng?: LatLng) => void;
  width?: number | string;
  height?: number | string;
}

function SelectLocation(props: SelectLocationProps) {
  const { height, width, onChanged, value } = props;

  /// Map state
  const [map, setMap] = useState<google.maps.Map | null>(null);

  /// Selected marker
  const marker = useMemo(() => {
    if (!value) return null;
    return <Marker position={{ lat: value.lat, lng: value.lng }} />;
  }, [value]);

  useEffect(() => {
    if (!map || !value) return;
    const bounds = new window.google.maps.LatLngBounds();
    if (value) bounds.extend(value);
    map.fitBounds(bounds);
  }, [value]);

  /// Load map api
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_KEY,
  });
  if (!isLoaded) return <></>;

  /// Load map
  const onLoad = (map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds();
    if (value) bounds.extend(value);
    map.fitBounds(bounds);
    setMap(map);
  };

  return (
    <GoogleMap
      mapContainerStyle={{ height, width }}
      options={{
        disableDefaultUI: true,
      }}
      onClick={(e) => {
        const lat = e.latLng?.lat();
        const long = e.latLng?.lng();
        if (!lat || !long) return;
        onChanged({ lat: lat, lng: long });
      }}
      center={value ?? { lat: 30, lng: 33 }}
      zoom={10}
      onLoad={onLoad}
    >
      {marker}
    </GoogleMap>
  );
}

export default SelectLocation;
