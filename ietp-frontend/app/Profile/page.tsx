"use client";

import BusLocationTracker from "@/components/BusLocationTracker";
import { LocationData } from "@/types/location";

export default function ProfilePage() {
  const handleLocationUpdate = (location: LocationData) => {
    // Handle location updates here if needed
    console.log("Location updated:", location);
  };

  return (
    <div
      className="relative flex flex-col items-center justify-center min-h-screen p-6 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://www.bus-planet.com/bus/pictures/Ethiopia/JN/400/B2003-02-002.jpg')",
      }}
    >
      {/* Black overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-md">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Hi, Yeabsira!
        </h1>

        <BusLocationTracker
          busId="your-bus-id"
          driverName="Yeabsira"
          onLocationUpdate={handleLocationUpdate}
          className="w-full"
        />
      </div>
    </div>
  );
}
