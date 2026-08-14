"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

type Pin = { name: string; lat: number; lng: number; number: number; group: "dubai" | "abudhabi" };

// Approximate community centers — accurate enough to convey coverage, not for pinpoint navigation.
const pins: Pin[] = [
  { name: "Downtown", lat: 25.1972, lng: 55.2744, number: 1, group: "dubai" },
  { name: "Business Bay", lat: 25.1877, lng: 55.2633, number: 2, group: "dubai" },
  { name: "Marina", lat: 25.0805, lng: 55.1403, number: 3, group: "dubai" },
  { name: "Palm Jumeirah", lat: 25.1124, lng: 55.139, number: 4, group: "dubai" },
  { name: "Dubai Hills", lat: 25.105, lng: 55.244, number: 5, group: "dubai" },
  { name: "MBR City", lat: 25.156, lng: 55.299, number: 6, group: "dubai" },
  { name: "JVC", lat: 25.0563, lng: 55.2093, number: 7, group: "dubai" },
  { name: "Saadiyat", lat: 24.547, lng: 54.434, number: 1, group: "abudhabi" },
  { name: "Yas", lat: 24.49, lng: 54.605, number: 2, group: "abudhabi" },
  { name: "Al Reem", lat: 24.4992, lng: 54.4046, number: 3, group: "abudhabi" },
  { name: "Al Raha Beach", lat: 24.446, lng: 54.607, number: 4, group: "abudhabi" },
  { name: "Corniche", lat: 24.4764, lng: 54.345, number: 5, group: "abudhabi" },
];

function pinIcon(number: number, group: "dubai" | "abudhabi") {
  const bg = group === "dubai" ? "#f97316" : "#0a1930";
  return L.divIcon({
    className: "",
    html: `<div style="display:flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:9999px;background:${bg};color:#fff;font-size:11px;font-weight:700;font-family:inherit;border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.35);">${number}</div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 13],
  });
}

function FitBounds() {
  const map = useMap();
  useEffect(() => {
    const bounds = L.latLngBounds(pins.map((p) => [p.lat, p.lng]));
    map.fitBounds(bounds, { padding: [28, 28] });
  }, [map]);
  return null;
}

export default function OperatingMap() {
  return (
    <MapContainer center={[24.85, 54.85]} zoom={9} scrollWheelZoom={false} className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds />
      {pins.map((p) => (
        <Marker key={`${p.group}-${p.number}`} position={[p.lat, p.lng]} icon={pinIcon(p.number, p.group)}>
          <Tooltip direction="top" offset={[0, -14]}>
            {p.name}
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
