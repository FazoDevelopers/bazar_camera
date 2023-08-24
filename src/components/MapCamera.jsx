import React, { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

const CenteredMarker = ({ position, name, onDelete, onMove }) => {
  const map = useMap();

  const handleDragEnd = (event) => {
    const newPosition = event.target.getLatLng();
    onMove(newPosition);
  };

  return (
    <Marker
      position={position}
      draggable={true}
      eventHandlers={{
        dragend: handleDragEnd,
      }}
    >
      <Popup>
        {name}
        <button onClick={onDelete}>Delete</button>
      </Popup>
    </Marker>
  );
};

const AddMarkerToClick = ({ onMapClick }) => {
  useMapEvents({
    click: onMapClick,
  });

  return null;
};

const MapComponent = () => {
  const [locations, setLocations] = useState([
    { id: 1, name: "Location 1", lat: 51.505, lng: -0.09 },
  ]);

  const handleDelete = (id) => {
    const newLocations = locations.filter((location) => location.id !== id);
    setLocations(newLocations);
  };

  const handleMove = (id, newPosition) => {
    const newLocations = locations.map((location) => {
      if (location.id === id) {
        console.log(location);
        return { ...location, lat: newPosition.lat, lng: newPosition.lng };
      }
      return location;
    });
    setLocations(newLocations);
  };

  const handleMapClick = (event) => {
    const newLocation = {
      id: Date.now(),
      name: `Location ${locations.length + 1}`,
      lat: event.latlng.lat,
      lng: event.latlng.lng,
    };

    console.log(newLocation);
    setLocations([...locations, newLocation]);
  };

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={13}
      style={{ width: "100%", height: "100vh" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <AddMarkerToClick onMapClick={handleMapClick} />
      {locations.map((location) => (
        <CenteredMarker
          key={location.id}
          position={[location.lat, location.lng]}
          name={location.name}
          onDelete={() => handleDelete(location.id)}
          onMove={(newPosition) => handleMove(location.id, newPosition)}
        />
      ))}
    </MapContainer>
  );
};

export default MapComponent;
