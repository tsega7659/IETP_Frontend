"use client";
import { useState, useEffect, useCallback } from "react";
import { LocationData } from "../types/location";

interface BusLocationTrackerProps {
  busId: string;
  driverName: string;
  onLocationUpdate?: (location: LocationData) => void;
  className?: string;
}

export default function BusLocationTracker({
  busId,
  driverName,
  onLocationUpdate,
  className = "",
}: BusLocationTrackerProps) {
  const [tracking, setTracking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("");

  const addDebugInfo = (info: string) => {
    setDebugInfo((prev) => `${new Date().toISOString()}: ${info}\n${prev}`);
  };

  const updateLocationOnServer = useCallback(
    async (position: GeolocationPosition) => {
      const newLocationData: LocationData = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        speed: position.coords.speed,
        heading: position.coords.heading,
        accuracy: position.coords.accuracy,
        timestamp: new Date().toISOString(),
      };

      // Log the data we're about to send
      addDebugInfo(
        `Sending location update: ${JSON.stringify(newLocationData)}`
      );

      try {
        const response = await fetch("/api/update-bus-location", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            busId,
            locationData: newLocationData,
          }),
        });

        // Log the response status
        addDebugInfo(`Server response status: ${response.status}`);

        if (!response.ok) {
          // Get the error message from the response if possible
          const errorData = await response.json().catch(() => ({}));
          const errorMessage =
            errorData.message ||
            `Server responded with status ${response.status}`;
          addDebugInfo(`Error response: ${errorMessage}`);
          throw new Error(errorMessage);
        }

        const responseData = await response.json();
        addDebugInfo(`Success response: ${JSON.stringify(responseData)}`);

        // Update location data if accuracy is acceptable (e.g., within 2000 meters)
        if (position.coords.accuracy <= 2000) {
          setLocationData(newLocationData);
          onLocationUpdate?.(newLocationData);
          addDebugInfo("Location update successful");
        } else {
          addDebugInfo(
            `Location accuracy (${position.coords.accuracy}m) exceeds threshold`
          );
        }

        setError(null);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Unknown error occurred";
        addDebugInfo(`Error: ${errorMessage}`);
        console.error("Error updating location:", err);
        setError(`Failed to update location: ${errorMessage}`);
      }
    },
    [busId, onLocationUpdate]
  );

  const startTracking = useCallback(() => {
    addDebugInfo("Starting location tracking");

    if (!navigator.geolocation) {
      const errorMsg = "Geolocation is not supported by your browser";
      addDebugInfo(errorMsg);
      setError(errorMsg);
      return;
    }

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000, // Increased timeout to 10 seconds
      maximumAge: 0,
    };

    const successHandler = (position: GeolocationPosition) => {
      addDebugInfo(
        `Received position - Accuracy: ${position.coords.accuracy}m`
      );
      updateLocationOnServer(position);
    };

    const errorHandler = (err: GeolocationPositionError) => {
      let errorMsg = "";
      switch (err.code) {
        case err.PERMISSION_DENIED:
          errorMsg =
            "Please enable location services in your browser settings and ensure you are using HTTPS.";
          break;
        case err.POSITION_UNAVAILABLE:
          errorMsg =
            "Location information is unavailable. Please check your GPS settings.";
          break;
        case err.TIMEOUT:
          errorMsg =
            "Location request timed out. Please check your internet connection.";
          break;
        default:
          errorMsg = "An unknown error occurred while tracking location.";
      }
      addDebugInfo(`Geolocation error: ${errorMsg} (Code: ${err.code})`);
      setError(errorMsg);
      setTracking(false);
    };

    const id = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      options
    );

    setWatchId(id);
    setTracking(true);
  }, [updateLocationOnServer]);

  const stopTracking = useCallback(() => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
      addDebugInfo("Stopped location tracking");
    }
    setTracking(false);
    setLocationData(null);
  }, [watchId]);

  useEffect(() => {
    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
        addDebugInfo("Cleanup: Stopped location tracking");
      }
    };
  }, [watchId]);

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <h2 className="text-2xl font-bold mb-4">Bus Location Tracker</h2>
      <p className="text-gray-600 mb-4">Driver: {driverName}</p>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {locationData && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <p>Latitude: {locationData.latitude.toFixed(6)}</p>
          <p>Longitude: {locationData.longitude.toFixed(6)}</p>
          <p>Accuracy: ±{locationData.accuracy.toFixed(1)}m</p>
          {locationData.speed && (
            <p>Speed: {(locationData.speed * 3.6).toFixed(1)} km/h</p>
          )}
          <p>
            Last Update: {new Date(locationData.timestamp).toLocaleTimeString()}
          </p>
        </div>
      )}

      <button
        onClick={tracking ? stopTracking : startTracking}
        className={`${
          tracking
            ? "bg-red-500 hover:bg-red-600"
            : "bg-blue-500 hover:bg-blue-600"
        } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
      >
        {tracking ? "Stop Tracking" : "Start Tracking"}
      </button>

      {/* Debug Information (can be toggled in development) */}
      {process.env.NODE_ENV === "development" && (
        <div className="mt-4 p-4 bg-gray-100 rounded overflow-auto max-h-40 text-xs font-mono">
          <pre>{debugInfo}</pre>
        </div>
      )}
    </div>
  );
}
