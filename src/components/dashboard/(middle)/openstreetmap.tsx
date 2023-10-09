"use client";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";

export default function OpenStreetMap() {
  const start = { center: [37.952861, 161.557562], zoom: 1 };

  return (
    <>
      <MapContainer
        className="h-56"
        center={start.center}
        zoom={start.zoom}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </>
  );
}
