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
    html: `<div style="position:relative;width:30px;height:30px;filter:drop-shadow(0 2px 3px rgba(10,25,48,0.35));">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="${bg}" stroke="#ffffff" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
      </svg>
      <span style="position:absolute;top:3px;left:0;width:100%;text-align:center;color:#fff;font-size:11px;font-weight:700;font-family:inherit;line-height:1;">${number}</span>
    </div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 28],
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
          <Tooltip direction="top" offset={[0, -26]}>
            {p.name}
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
