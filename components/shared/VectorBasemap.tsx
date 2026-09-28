"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "@maplibre/maplibre-gl-leaflet";
import "maplibre-gl/dist/maplibre-gl.css";
import { setWorkerUrl, type ExpressionSpecification } from "maplibre-gl";

// OpenFreeMap: free, keyless vector tiles built for production use (CARTO and
// Stadia now require API keys). "Liberty" gives the soft beige-land / clean
// water look and far fewer icons than the stock OpenStreetMap raster tiles.
const STYLE_URL = "https://tiles.openfreemap.org/styles/liberty";

// Attribution: the Leaflet–MapLibre bridge reads it from the style's own
// source, so OpenFreeMap/OpenMapTiles/OpenStreetMap are credited without any
// manual addAttribution() (doing that too shows the credit twice).

// The style labels places as "<latin> <arabic>" — show the Latin name only,
// falling back to the local name where no Latin one exists.
const LATIN_LABEL: ExpressionSpecification = ["coalesce", ["get", "name:latin"], ["get", "name"]];

export default function VectorBasemap() {
  const map = useMap();

  useEffect(() => {
    let layer: L.Layer;

    // Served from public/ (see scripts/copy-maplibre-worker.mjs) — the bundled
    // worker fails to load under Next.
    setWorkerUrl("/maplibre-gl-worker.mjs");

    try {
      const glLayer = L.maplibreGL({ style: STYLE_URL });
      layer = glLayer;
      glLayer.addTo(map);

      const gl = glLayer.getMaplibreMap();
      gl.once("load", () => {
        for (const styleLayer of gl.getStyle().layers) {
          if (styleLayer.type !== "symbol") continue;
          if (styleLayer.id.includes("shield")) {
            gl.setLayoutProperty(styleLayer.id, "visibility", "none");
            continue;
          }
          const textField = styleLayer.layout?.["text-field"];
          if (textField && JSON.stringify(textField).includes("name:nonlatin")) {
            gl.setLayoutProperty(styleLayer.id, "text-field", LATIN_LABEL);
          }
        }
      });
    } catch (err) {
      // No WebGL (or the style failed to construct) — plain raster tiles keep
      // the map usable rather than leaving it blank.
      console.error("Vector basemap unavailable, falling back to raster tiles:", err);
      layer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      });
      layer.addTo(map);
    }

    return () => {
      map.removeLayer(layer);
    };
  }, [map]);

  return null;
}
