"use client";

import { useEffect, useRef } from "react";
import { Icon } from "leaflet";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import L from "leaflet";
import useGeoLocation from "@/hooks/useGeoLocation";

// Move this outside of component to avoid re-running on every render
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "leaflet/images/marker-icon-2x.png",
  iconUrl: "leaflet/images/marker-icon.png",
  shadowUrl: "leaflet/images/marker-shadow.png",
});

interface BusStop {
  geocode: [number, number];
  name: string;
}

interface RoutingMachineProps {
  busStops: BusStop[];
}

const RoutingMachine: React.FC<RoutingMachineProps> = ({ busStops }) => {
  const map = useMap();
  const routingControlRef = useRef<L.Routing.Control | null>(null);
  const routeLayerRef = useRef<L.LayerGroup | null>(null);
  useEffect(() => {
    if (!map) return;

    // Clear existing routes and controls
    const cleanup = () => {
      if (routingControlRef.current) {
        map.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      }
      if (routeLayerRef.current) {
        map.removeLayer(routeLayerRef.current);
        routeLayerRef.current = null;
      }
    };

    cleanup();
    routeLayerRef.current = L.layerGroup().addTo(map);

    const busStopIcon = new Icon({
      iconUrl: "/bus-stop.png",
      iconSize: [38, 38],
      iconAnchor: [19, 38],
    });

    try {
      const createPlan = () => {
        const waypoints = busStops.map((busStop) =>
          L.Routing.waypoint(
            L.latLng(busStop.geocode[0], busStop.geocode[1]),
            busStop.name
          )
        );

        return new L.Routing.Plan(waypoints, {
          createMarker: (i: number) => {
            const busStop = busStops[i];
            if (busStop.name === "" || busStop.name === undefined) {
              return false;
            }
            const marker = L.marker(
              L.latLng(busStop.geocode[0], busStop.geocode[1]),
              {
                icon: busStopIcon,
                draggable: false,
              }
            );
            marker.bindPopup(busStop.name);
            return marker;
          },
        });
      };

      const plan = createPlan();

      const routingControl = L.Routing.control({
        plan: plan,
        routeWhileDragging: false,
        showAlternatives: false,
        fitSelectedRoutes: true,
        show: false, // Hide the routing narrative
        addWaypoints: false, // Prevent adding new waypoints
        // draggableWaypoints: false, // Prevent dragging waypoints
        lineOptions: {
          styles: [{ color: "#4A90E2", opacity: 0.8, weight: 5 }],
          extendToWaypoints: true,
          missingRouteTolerance: 100,
        },
      });

      routingControl.addTo(map);
      routingControlRef.current = routingControl;

      routingControl.on("routesfound", function (e) {
        const allWaypoints = routingControl
          .getWaypoints()
          .map((waypoint) => waypoint.latLng);
        const bounds = L.latLngBounds(allWaypoints);
        map.fitBounds(bounds, { padding: [50, 50] });
      });
    } catch (error) {
      console.error("Error setting up routing:", error);
    }

    return cleanup;
  }, [map, busStops]);
  return null;
};

const busStops: BusStop[] = [
  { geocode: [9.01866, 38.801992], name: "Megenagna" },
  { geocode: [9.0190441308406, 38.801606339804245], name: "" },
  { geocode: [9.017379782953983, 38.802001048587286], name: "" },
  { geocode: [9.011009309795154, 38.80001541679906], name: "" },
  {
    geocode: [9.010238997946459, 38.799868314156726],
    name: "",
  },
  {
    geocode: [9.007201214582865, 38.80557173028307],
    name: "Gerji (Infront of tottot)",
  },
  {
    geocode: [9.004690006, 38.810078846],
    name: "Gerji MebratHail",
  },
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
const Map = () => {
  const location = useGeoLocation();
  const mapRef = useRef(null);

  const center: [number, number] =
    location.loaded && location.latitude && location.longitude
      ? [location.latitude, location.longitude]
      : [9.01866, 38.801992];

  return (
    <div className="relative w-full h-full z-0">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={true}
        zoomControl={false}
        className="h-full w-full"
        ref={mapRef}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <RoutingMachine busStops={busStops} />
      </MapContainer>
    </div>
  );
};

export default Map;
