"use client";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [tracking, setTracking] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [currentLocation, setCurrentLocation] =
    useState<GeolocationCoordinates | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (tracking) {
      timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
      if (watchId) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [tracking, watchId]);

  const handleStartTracking = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (position) => {
        setCurrentLocation(position.coords);
        setLocationAllowed(true);
      },
      (error) => {
        console.error("Error obtaining location:", error);
        setLocationAllowed(false);

        switch (error.code) {
          case error.PERMISSION_DENIED:
            alert("Please enable location services in your browser settings.");
            break;
          case error.POSITION_UNAVAILABLE:
            alert("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            alert("Location request timed out. Please try again.");
            break;
          default:
            alert("An unknown error occurred.");
        }
      },
      { enableHighAccuracy: true }
    );

    setWatchId(id);
    setTracking(true);
  };

  const handleStopTracking = () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null);
    }
    setTracking(false);
    setTimeElapsed(0);
    setCurrentLocation(null);
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800">Hi, Driver!</h1>
        <h2 className="text-lg text-gray-600 mt-4">
          {tracking
            ? "Tracking your location..."
            : "Press the button to start tracking."}
        </h2>
        <div className="mt-8">
          {!tracking ? (
            <button
              onClick={handleStartTracking}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Start Tracking
            </button>
          ) : (
            <>
              {locationAllowed && currentLocation && (
                <div className="bg-green-100 text-green-700 px-4 py-4 rounded-lg mt-6 shadow-xl">
                  <p>Your location is being monitored.</p>
                  <p>
                    Current Position:{" "}
                    <span className="font-mono">
                      {currentLocation.latitude.toFixed(6)},{" "}
                      {currentLocation.longitude.toFixed(6)}
                    </span>
                  </p>
                </div>
              )}
              <div className="text-lg text-gray-800 mt-4">
                Time Elapsed: {formatTime(timeElapsed)}
              </div>
              <button
                onClick={handleStopTracking}
                className="mt-6 bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
              >
                Stop Tracking
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
