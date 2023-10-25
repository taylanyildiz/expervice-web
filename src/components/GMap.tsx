import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { ReactNode } from "react";

interface GMapProps {
  zoom?: number;
  center: { lat: number; lng: number };
  height?: number | string;
  width?: number | string;
  children?: ReactNode;
}

function GMap(props: GMapProps) {
  const { zoom, center, height, width, children } = props;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_KEY,
  });

  if (!isLoaded) return <></>;

  const onLoad = (map: google.maps.Map) => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
  };

  const onUnmount = (_: google.maps.Map) => {
    // do your stuff before map is unmounted
  };

  return (
    <GoogleMap
      mapContainerStyle={{ height, width }}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {/* Child components, such as markers, info windows, etc. */}
      {children}
    </GoogleMap>
  );
}

export default GMap;
