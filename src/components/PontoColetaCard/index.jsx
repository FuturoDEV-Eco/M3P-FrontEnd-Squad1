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
function PontoColetaCard({
  pontoColeta,
  zoom,
  scrollWheelZoom,
  onclickEditar,
  onclickDeletar
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
        center={[pontoColeta.latitude, pontoColeta.longitude]}
        zoom={zoom}
        scrollWheelZoom={scrollWheelZoom}
        placeholder={<MapPlaceholder />}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[pontoColeta.latitude, pontoColeta.longitude]}>
          <Popup>
            {pontoColeta.nome}. <br /> {pontoColeta.localizacao?.logradouro},{" "}
            {pontoColeta.localizacao?.numero}, {pontoColeta.localizacao?.bairro}
            , {pontoColeta.localizacao?.cidade} -{" "}
            {pontoColeta.localizacao?.estado}.
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
                {pontoColeta.tipoResiduo}
              </Typography>
            }
          </Typography>
        </CardContent>
      </CardActionArea>
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
    </Card>
  );
}

export default PontoColetaCard;
