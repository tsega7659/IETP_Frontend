"use client";
import React, { useEffect, useState } from "react";

const GetLocation = () => {
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          console.log("Latitude is :", latitude);
          console.log("Longitude is :", longitude);
        },
        (error) => {
          console.error("Error obtaining location:", error);
          alert("Unable to fetch location. Using default location.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );

  return (
    <div>
      {userLocation}
      {userLocation ? (
        <p>
          Latitude: {userLocation[0]}, Longitude: {userLocation[1]}
        </p>
      ) : (
        <p>Loading location...</p>
      )}
    </div>
  );
};

export default GetLocation;
