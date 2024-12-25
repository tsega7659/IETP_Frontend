"use client";

import { useEffect, useState } from "react";
import { Icon } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

const Map = () => {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(
    null
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error obtaining location:", error);
          alert("Unable to fetch location. Using default location.");
          setUserLocation([9.0192, 38.7525]); // Default location
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
      setUserLocation([9.0192, 38.7525]); // Default location
    }
  }, []);
  const markers: { geocode: [number, number]; name: string }[] = [
    { geocode: [9.0183799, 38.802328939], name: "Megenagna" },
    { geocode: [9.007012628, 38.805670977], name: "Gerji (Infront of tottot)" },
    { geocode: [9.004690006, 38.810078846], name: "Gerji MebratHail" },
    { geocode: [9.003585315, 38.815293059], name: "Jackros square" },
    { geocode: [8.990071698, 38.829461829], name: "Goro intersection" },
    { geocode: [8.968087483, 38.836982752], name: "ICT park" },
    { geocode: [8.957288288, 38.834901354], name: "Hot water Spring" },
    { geocode: [8.93998135, 38.821586869], name: "Gojo Arsema Station" },
    { geocode: [8.915095222, 38.817890789], name: "Koye 16" },
    { geocode: [8.900155311, 38.814859894], name: "Koye Square" },
    { geocode: [8.884138883, 38.814763338], name: "AASTU" },
    { geocode: [8.873422007, 38.819687875], name: "Tulu Dimtu Square" },
  ];
  const busIcon = new Icon({
    iconUrl: "/bus-stop.png",
    iconSize: [38, 38],
  });
  return (
    <div className="relative w-full h-full z-0">
      <MapContainer
        center={userLocation || [9.0192, 38.7525]}
        zoom={13}
        scrollWheelZoom={false}
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerClusterGroup>
          {markers.map((marker, index) => (
            <Marker position={marker.geocode} icon={busIcon} key={index}>
              <Popup>{marker.name}</Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
};

export default Map;
