import React, { useState } from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "./style.css";
function SetViewOnClick({ coords, zoomCustom }) {
  const map = useMap();
  map.flyTo(coords, zoomCustom);

  return null;
}

function NewMap() {
  const [centerPositions, setCenterPositions] = useState([
    40.99681833333333, 71.64040666666666,
  ]);
  const [zoomCustom, setZoom] = useState(12);

  // Assuming position and other variables are defined here or passed as props
  const position = {
    cam_id: "some_id",
    location: [40.99681833333333, 71.64040666666666],
    name: "Some Name",
    address: "Some Address",
  };
  const detectedAdress = "Some Address"; // Example value
  const redMarker = "../../../public/marker.png"; // Example value
  const marker = "../../../public/marker.png"; // Example value

  const getJsonLocation = (location) => {
    // Your logic to convert location to required format
    return location;
  };

  const showInfoModal = (position) => {
    // setLocationInfo(position); // Assuming this function is defined elsewhere
    setCenterPositions(position.location);
    setZoom(15);
  };

  return (
    <MapContainer
      center={centerPositions}
      zoom={zoomCustom}
      scrollWheelZoom={true}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        key={position.cam_id}
        position={getJsonLocation(position.location)}
        icon={
          new L.Icon({
            iconUrl: detectedAdress === position.address ? redMarker : marker,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
          })
        }
        eventHandlers={{
          click: () => {
            showInfoModal(position);
          },
        }}
      >
        <Tooltip permanent>
            <div>
                <h1>{position.name}</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, consequuntur consequatur odit enim libero illo! Quae rerum tenetur architecto repellendus perferendis, quasi expedita eos nulla quia pariatur soluta fugiat consectetur!</p>
            </div>
        </Tooltip>
      </Marker>
      <SetViewOnClick coords={centerPositions} zoomCustom={zoomCustom} />
    </MapContainer>
  );
}

export default NewMap;
