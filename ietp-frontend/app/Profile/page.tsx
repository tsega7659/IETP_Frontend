"use client";

import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [tracking, setTracking] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null; // Initialize the timer to null

    if (tracking) {
      // Start the timer
      timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer); // Safely clear the timer
      }
    };
  }, [tracking]);

  const handleStartTracking = () => {
    setTracking(true);
  };

  const handleStopTracking = () => {
    setTracking(false);
    setTimeElapsed(0); // Reset the timer
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="text-center">
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
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg mt-6">
                Your location is monitored.
              </div>
              <div className="text-lg text-gray-800 mt-4">
                Time Elapsed: {timeElapsed} seconds
              </div>
              <button
                onClick={handleStopTracking}
                className="mt-6 bg-red-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-700 transition duration-300"
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
