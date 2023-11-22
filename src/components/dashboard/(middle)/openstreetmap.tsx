"use client";
import "leaflet/dist/leaflet.css";
import "/public/openstreetmap/style.css";
import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";

export default function OpenStreetMap({ newsLocation }) {
  return (
    <>
      <MapContainer
        className="h-56"
        center={[24.796708, 176.277178]}
        dragging={false}
        zoom={1}
        minZoom={1}
        zoomControl={false}
        scrollWheelZoom={false}
        doubleClickZoom={false}
        attributionControl={false}
      >
        <TileLayer
          url={`https://image.310soft.com/?url=https://tile.openstreetmap.org/{z}/{x}/{y}.png`}
        />
        {newsLocation.position && (
          <CircleMarker
            center={newsLocation.position}
            weight={1}
            color="#e80778"
            radius={15}
            className="ping"
          ></CircleMarker>
        )}
      </MapContainer>
    </>
  );
}
