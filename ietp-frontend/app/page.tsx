"use client";
import Sidebar from "@/components/Sidebar";
import Map from "@/components/map/Map";
import "leaflet/dist/leaflet.css";
import "@/styles/mapStyle.css";
export default function Home() {
  return (
    <div>
      <div className="w-full h-screen">
        <Sidebar />
        <Map />
      </div>
    </div>
  );
}
