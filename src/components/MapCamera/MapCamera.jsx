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
import L from "leaflet";
import { Button, Flex, Grid } from "@mantine/core";
import "./MapCamera.css";
import { Carousel } from "@mantine/carousel";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";

const customIcon = new L.Icon({
  iconUrl: "../../../public/marker.png",
  iconSize: [50, 50],
});
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
      icon={customIcon}
    >
      <Popup>
        <Carousel
          maw={320}
          mx="auto"
          height={180}
          nextControlIcon={<IconArrowRight size={16} />}
          previousControlIcon={<IconArrowLeft size={16} />}
        >
          <Carousel.Slide>
            <img src="https://picsum.photos/250/250?random=2" alt="" />
          </Carousel.Slide>
          <Carousel.Slide>
            <img src="https://picsum.photos/250/250?random=20" alt="" />
          </Carousel.Slide>
          <Carousel.Slide>
            <img src="https://picsum.photos/250/250?random=21" alt="" />
          </Carousel.Slide>
        </Carousel>

        <Flex
          mt="sm"
          direction="column"
          wrap="wrap"
          gap="md"
          justify="flex-start"
          align="flex-start"
        >
          <span>
            <b>Hudud:</b> Namangan
          </span>
          <span>
            <b>Sana:</b> 03.05.2003
          </span>
        </Flex>

        <Button
          variant="gradient"
          gradient={{ from: "orange", to: "red" }}
          compact
          onClick={onDelete}
          style={{ width: "100%", marginTop: "20px" }}
        >
          Delete
        </Button>
      </Popup>
    </Marker>
  );
};

const AddMarkerToClick = ({ onRightClick }) => {
  useMapEvents({
    contextmenu: onRightClick,
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

  // marker move function
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

  // marker add function
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
      zoom={19}
      style={{ width: "100%", height: "100vh" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <AddMarkerToClick onRightClick={handleMapClick} />
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
