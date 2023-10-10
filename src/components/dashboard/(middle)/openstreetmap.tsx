"use client";
import "leaflet/dist/leaflet.css";
import "/public/openstreetmap/style.css";

import { MapContainer, TileLayer, CircleMarker, Marker } from "react-leaflet";

export default function OpenStreetMap({ location }) {
  const start = { center: [26.332807, -186.537044], zoom: 1 };

  return (
    <>
      <MapContainer
        className="h-56"
        //@ts-ignore
        center={start.center}
        dragging={true}
        zoom={start.zoom}
        minZoom={start.zoom}
        zoomControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <CircleMarker
          //@ts-ignore
          center={start.center}
          weight={1}
          color="#e80778"
          radius={15}
          className="ping"
        ></CircleMarker>
      </MapContainer>
    </>
  );
}
