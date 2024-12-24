"use client"; // This ensures the code runs on the client side

import { useEffect } from 'react';
import L from 'leaflet';

const Map = () => {
  useEffect(() => {
    // Initialize the map
    const map = L.map('map').setView([9.0183799 , 38.802328939], 13);

    // Add OpenStreetMap tiles
    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution: '© OpenStreetMap contributors',
    // }).addTo(map);
    let tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Add a mark
    const marker = L.marker([9.0183799 , 38.802328939]).addTo(map);
  }, []);

  return (
    <div
      id="map"
      style={{ height: '100vh', width: '100%' }}
    ></div>
  );
};

export default Map;
