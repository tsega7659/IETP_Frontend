import { useState, useEffect } from "react";

interface GeoLocation {
  loaded: boolean;
  latitude: number | null;
  longitude: number | null;
  error: string | null;
}

const useGeoLocation = (): GeoLocation => {
  const [location, setLocation] = useState<GeoLocation>({
    loaded: false,
    latitude: null,
    longitude: null,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation((prevState) => ({
        ...prevState,
        error: "Geolocation is not supported by your browser",
      }));
      return;
    }

    const success = (position: GeolocationPosition) => {
      setLocation({
        loaded: true,
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        error: null,
      });
    };

    const error = () => {
      setLocation((prevState) => ({
        ...prevState,
        error: "Unable to retrieve your location",
      }));
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return location;
};

export default useGeoLocation;
