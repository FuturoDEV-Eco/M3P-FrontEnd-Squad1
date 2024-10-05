import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography
} from "@mui/material";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import EditLocationOutlinedIcon from "@mui/icons-material/EditLocationOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import OpenInNewIcon from "@mui/icons-material/OpenInNew"; // Ícone para "Abrir no Maps"

function PontoColetaCard({
  pontoColeta,
  zoom,
  scrollWheelZoom,
  onclickEditar,
  onclickDeletar,
  isOwner // flag se o usuário é dono do local
}) {
  function MapPlaceholder() {
    return (
      <p>
        Mapa do {pontoColeta.nome}.{" "}
        <noscript>
          Você precisa estar com o JavaScript habilitado para ver esse mapa.
        </noscript>
      </p>
    );
  }

  // Link para o Google Maps com base na latitude e longitude
  const googleMapsLink = `https://www.google.com/maps?q=${pontoColeta.lat},${pontoColeta.lon}`;

  return (
    <Card
      sx={{
        transition: "0.2s",
        "&:hover": {
          transform: "scale(1.05)"
        }
      }}>
      <CardMedia
        component={MapContainer}
        sx={{ width: 1000, height: 200 }}
        center={[pontoColeta.lat, pontoColeta.lon]}
        zoom={zoom}
        scrollWheelZoom={scrollWheelZoom}
        placeholder={<MapPlaceholder />}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[pontoColeta.lat, pontoColeta.lon]}>
          <Popup>
            {pontoColeta.nome}. <br /> {pontoColeta.logradouro},{" "}
            {pontoColeta.numero}, {pontoColeta.bairro}, {pontoColeta.localidade}{" "}
            - {pontoColeta.uf}.
          </Popup>
        </Marker>
      </CardMedia>
      <CardActionArea>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography variant="h5">{pontoColeta.nome}</Typography>
          <Typography component="p" variant="body2">
            {pontoColeta.descricao}
          </Typography>
          <Typography component="p" variant="body2">
            Tipo de resíduos aceitos:{" "}
            {
              <Typography component="span" variant="body2" color="primary">
                {/* Se for um array, separa por vírgula e espaço */}
                {Array.isArray(pontoColeta.tipos_residuo)
                  ? pontoColeta.tipos_residuo.join(", ")
                  : pontoColeta.tipos_residuo}
              </Typography>
            }
          </Typography>
          {/* Botão para abrir o local no Google Maps */}
          <Button
            variant="outlined"
            color="primary"
            endIcon={<OpenInNewIcon />}
            href={googleMapsLink}
            target="_blank" // abre o link em uma nova aba
          >
            Abrir no Maps
          </Button>
        </CardContent>
      </CardActionArea>
      {isOwner && ( // exibe botões somente se o usuário é o dono
        <CardActions>
          <Button
            variant="contained"
            startIcon={<EditLocationOutlinedIcon />}
            onClick={() => onclickEditar()}>
            Editar
          </Button>
          <Button
            color="error"
            endIcon={<DeleteForeverOutlinedIcon />}
            onClick={() => onclickDeletar()}>
            Deletar
          </Button>
        </CardActions>
      )}
    </Card>
  );
}

export default PontoColetaCard;
