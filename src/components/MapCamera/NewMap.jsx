import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    if (coords && coords.length === 2) {
      setTimeout(() => {
        map.flyTo(coords, zoomCustom);
      }, 100);
    }
  }, [coords, zoomCustom, map]);

  return null;
}

function ZoomButton({ position, zoomLevel, onClick }) {
  return (
    <button
      onClick={() => onClick(position, zoomLevel)}
      style={{ backgroundColor: position.humanDetected ? "red" : "initial" }}
    >
      Zoom to {position.name}
    </button>
  );
}

function NewMap() {
  const [centerPositions, setCenterPositions] = useState([
    40.99681833333333, 71.64040666666666,
  ]);
  const [zoomCustom, setZoom] = useState(12);
  const [playedSounds, setPlayedSounds] = useState([]);

  const [positions, setPositions] = useState([
    {
      cam_id: "id_1",
      location: [40.99681833333333, 71.64040666666666],
      name: "Location 1",
      address: "Address 1",
      photo: "https://picsum.photos/id/100/50/50",
      humanDetected: true,
    },
    {
      cam_id: "id_2",
      location: [41.09681833333333, 71.74040666666666],
      name: "Location 2",
      address: "Address 2",
      photo: "https://picsum.photos/id/101/50/50",
      humanDetected: false,
    },
    {
      cam_id: "id_3",
      location: [41.19681833333333, 71.8404666666666],
      name: "Location 3",
      address: "Address 3",
      photo: "https://picsum.photos/id/102/50/50",
      humanDetected: true,
    },
    {
      cam_id: "id_4",
      location: [41.29681833333333, 71.94040666666666],
      name: "Location 4",
      address: "Address 4",
      photo: "https://picsum.photos/id/103/50/50",
      humanDetected: false,
    },
    {
      cam_id: "id_5",
      location: [41.39681833333333, 72.04040666666666],
      name: "Location 5",
      address: "Address 5",
      photo: "https://picsum.photos/id/104/50/50",
      humanDetected: true,
    },
  ]);

  const speak = (message) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(message);
      speech.rate = 0.8; // Adjust this value for desired speed
      window.speechSynthesis.speak(speech);
    } else {
      console.warn("Your browser doesn't support speech synthesis.");
    }
  };

  useEffect(() => {
    positions.forEach((position) => {
      if (position.humanDetected && !playedSounds.includes(position.cam_id)) {
        const message = `Human detected in ${position.name}`;
        if (positions.some((pos) => pos.cam_id === position.cam_id)) {
          speak(message);
          setPlayedSounds((prev) => [...prev, position.cam_id]);
        }
      }
    });
  }, [positions]);

  useEffect(() => {
    const timer = setInterval(() => {
      setPositions((prevPositions) => prevPositions.slice(1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleZoomButtonClick = (position, zoomLevel) => {
    if (position && position.location && position.location.length === 2) {
      setCenterPositions(position.location);
      setZoom(zoomLevel);
    }
  };

  return (
    <div>
      {positions.map((position) => (
        <ZoomButton
          key={position.cam_id}
          position={position}
          zoomLevel={15}
          onClick={handleZoomButtonClick}
        />
      ))}
      <MapContainer
        center={centerPositions}
        zoom={zoomCustom}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {positions.map((position) => (
          <Marker
            key={position.cam_id}
            position={position.location}
            icon={
              new L.DivIcon({
                className: position.humanDetected ? "marker-icon" : "",
                html: `<img src="${position.photo}" alt="${position.name}" style="width: 50px; height: 50px;" />`,
                iconSize: [50, 50],
                iconAnchor: [25, 25],
                popupAnchor: [0, -25],
              })
            }
          >
            <Tooltip permanent>
              <div>
                <img
                  src={position.photo}
                  alt={position.name}
                  style={{ width: "50px", height: "50px" }}
                />
                <p>{position.name}</p>
              </div>
            </Tooltip>
          </Marker>
        ))}
        <SetViewOnClick coords={centerPositions} zoomCustom={zoomCustom} />
      </MapContainer>
    </div>
  );
}

export default NewMap;
