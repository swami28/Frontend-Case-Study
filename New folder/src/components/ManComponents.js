import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

function MapComponent({ address }) {
  const position = [address.lat, address.lng];

  return (
    <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={position}>
        <Popup>{address.label}</Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapComponent;

