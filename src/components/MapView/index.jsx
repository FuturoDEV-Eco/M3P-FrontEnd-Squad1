// Já se alongou hoje? 🤸‍♂ ️
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEffect, useRef } from "react";

const MapView = ({ pontosColeta }) => {
  useEffect(() => {
    if (pontosColeta.length > 0 && mapRef.current) {
      const bounds = L.latLngBounds(
        pontosColeta.map((ponto) => [ponto.lat, ponto.lon])
      );
      mapRef.current.fitBounds(bounds); // Enquadra todos os pontos no mapa
    }
  }, [pontosColeta]);

  const mapRef = useRef(); // Referência para o mapa

  return (
    <MapContainer
      center={[-15.7801, -47.9292]} // Posição inicial, só será usada até o fitBounds rodar
      zoom={13}
      style={{ height: "400px", width: "100%" }}
      ref={mapRef}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {pontosColeta.map((ponto) => (
        <Marker key={ponto.id} position={[ponto.lat, ponto.lon]}>
          <Popup>
            <b>{ponto.nome}</b>
            <br />
            {ponto.descricao}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
