export interface LocationData {
  latitude: number;
  longitude: number;
  speed: number | null;
  heading: number | null;
  accuracy: number;
  timestamp: string;
}

export interface BusLocationUpdate {
  busId: string;
  locationData: LocationData;
}
