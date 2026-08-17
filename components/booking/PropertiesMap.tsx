"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Property } from "@/lib/types";

const DUBAI_CENTER: [number, number] = [25.2048, 55.2708];

function pinIcon(active: boolean) {
  const fill = active ? "#ea580c" : "#f97316";
  const scale = active ? 1.25 : 1;
  return L.divIcon({
    className: "",
    html: `<div style="transform:scale(${scale});transform-origin:bottom center;transition:transform 150ms ease;filter:drop-shadow(0 2px 3px rgba(10,25,48,0.35));">
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="${fill}" stroke="#ffffff" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round">
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
        <circle cx="12" cy="10" r="3" fill="#ffffff"/>
      </svg>
    </div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 30],
  });
}

function FitBounds({ points }: { points: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setView(points[0], 13);
      return;
    }
    map.fitBounds(L.latLngBounds(points), { padding: [40, 40] });
  }, [map, points]);
  return null;
}

export default function PropertiesMap({
  properties,
  hoveredId,
  onPinHover,
}: {
  properties: Property[];
  hoveredId?: string | null;
  onPinHover?: (id: string | null) => void;
}) {
  const pinned = properties.filter(
    (p): p is Property & { lat: number; lng: number } => typeof p.lat === "number" && typeof p.lng === "number"
  );
  const points: [number, number][] = pinned.map((p) => [p.lat, p.lng]);

  return (
    <MapContainer center={DUBAI_CENTER} zoom={11} scrollWheelZoom className="h-full w-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FitBounds points={points} />
      {pinned.map((p) => (
        <Marker
          key={p.id}
          position={[p.lat, p.lng]}
          icon={pinIcon(hoveredId === p.id)}
          eventHandlers={{
            mouseover: () => onPinHover?.(p.id),
            mouseout: () => onPinHover?.(null),
          }}
        >
          <Tooltip direction="top" offset={[0, -28]}>
            <span className="font-semibold">{p.name}</span>
            <br />
            {p.currency} {p.pricePerNight} / night
          </Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}
