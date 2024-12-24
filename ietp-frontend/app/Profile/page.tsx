"use client";

import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [tracking, setTracking] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [locationAllowed, setLocationAllowed] = useState(false);

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
    };
  }, [tracking]);

  const handleStartTracking = async () => {
    // Request location permission
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      console.log("User's location:", position.coords);
      setLocationAllowed(true);
      setTracking(true);
    } catch (error) {
      alert("Location permission denied. Please allow location to start tracking.");
      setLocationAllowed(false);
    }
  };

  const handleStopTracking = () => {
    setTracking(false);
    setTimeElapsed(0); // Reset the timer
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center bg-white p-6 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-gray-800">Hi, User!</h1>
        <h2 className="text-lg text-gray-600 mt-4">
          Please press the button to start tracking
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
              {locationAllowed && (
                <div className="bg-green-100 text-green-700 px-4 py-4 rounded-lg mt-6 shadow-xl">
                  Your location is monitored.
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
