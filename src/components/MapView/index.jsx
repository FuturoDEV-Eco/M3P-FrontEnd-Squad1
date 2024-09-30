
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapView = ({ pontosColeta }) => {
  return (
    <MapContainer center={[-15.7942, -47.8822]} zoom={12} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pontosColeta.map((ponto) => (
        <Marker key={ponto.id} position={[ponto.latitude, ponto.longitude]}>
          <Popup>{ponto.nome}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
