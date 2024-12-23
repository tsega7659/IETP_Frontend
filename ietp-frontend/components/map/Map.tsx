"use client"; // This ensures the code runs on the client side

import { useEffect } from 'react';
import L from 'leaflet';

const Map = () => {
  useEffect(() => {
    // Initialize the map
    const map = L.map('map').setView([51.505, -0.09], 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Add a marker
    L.marker([51.505, -0.09]).addTo(map)
      .bindPopup('A pretty popup.<br> Easily customizable.')
      .openPopup();
  }, []);

  return (
    <div
      id="map"
      style={{ height: '400px', width: '100%' }}
    ></div>
  );
};

export default Map;
