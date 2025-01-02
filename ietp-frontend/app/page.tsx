"use client";
import Sidebar from "@/components/Sidebar";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import "@/styles/mapStyle.css";

const Map = dynamic(() => import("@/components/map/Map"), { ssr: false });

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
