/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";
import { useCities } from "../contexts/CityContext";
import styles from "./Map.module.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useGeolocation } from "../hooks/useGeiolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";
const Map = () => {
  const [MapPosition, setMapPosition] = useState([
    5.605212059859407, -0.19484066766805017,
  ]);
  const {
    loading: isLoadingPosition,
    position: geoPosition,
    getPosition,
  } = useGeolocation();
  const [mapLat, mapLng] = useUrlPosition();

  // const location = useLocation()
  // console.log(location.pathname.split('/'))
  // console.log(location.search.split('='))

  const { cities } = useCities();
  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  useEffect(() => {
    if (geoPosition) setMapPosition([geoPosition.lat, geoPosition.lng]);
  }, [geoPosition]);
  return (
    <div className={styles.mapContainer}>
      {!geoPosition && (
        <Button onClick={getPosition} type="position">
          {isLoadingPosition ? "Loading..." : "Use your current Location"}
        </Button>
      )}
      <MapContainer
        center={MapPosition}
        // center={[mapLat, mapLng]}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((position) => (
          <Marker
            position={[position.position.lat, position.position.lng]}
            key={position.id}
          >
            <Popup>{position.cityName}</Popup>
          </Marker>
        ))}
        <ChangeMap position={MapPosition} />
        <DetectClicks />
      </MapContainer>
    </div>
  );
};

function ChangeMap({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClicks() {
  const navigate = useNavigate();
  useMapEvents({
    click: function (e) {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
export default Map;
