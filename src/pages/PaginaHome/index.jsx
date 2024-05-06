import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography
} from "@mui/material";
import PontoColetaCard from "../../components/PontoColetaCard";
import { useContext } from "react";
import { PontosColetaContext } from "../../contexts/PontosColeta/PontosColetaContext";
import { UsuariosContext } from "../../contexts/Usuarios/UsuariosContext";
import GroupIcon from "@mui/icons-material/Group";
import RecyclingIcon from "@mui/icons-material/Recycling";
import { useNavigate } from "react-router-dom";

function PaginaHome() {
  const { usuarios } = useContext(UsuariosContext);
  const { pontosColeta, deletarLocalColeta, getPontosColeta } =
    useContext(PontosColetaContext);
  const navigate = useNavigate();

  function handleEdit(id) {
    navigate(`/coleta/cadastro/${id}`);
  }

  async function handleDelete(id) {
    await deletarLocalColeta(id);
    await getPontosColeta();
  }
  return (
    <>
      <Typography variant="h4">Dashboard</Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: { xs: "wrap", sm: "nowrap" },
          justifyContent: "center",
          gap: 2,
          mt: 2
        }}>
        <Card
          sx={{ maxWidth: { xs: 200, sm: 300, md: 400 }, flexGrow: 1 }}
          elevation={10}>
          <CardActionArea sx={{ p: 2 }}>
            <Typography variant="h6" color="primary" textAlign="center">
              Usuários
            </Typography>
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                padding: 3
              }}>
              <GroupIcon color="primary" />
              <Typography color="primary" variant="h5">
                {usuarios.length}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          sx={{ maxWidth: { xs: 200, sm: 300, md: 400 }, flexGrow: 1 }}
          elevation={10}>
          <CardActionArea sx={{ p: 2 }}>
            <Typography variant="h6" color="primary" textAlign="center">
              Pontos de coleta
            </Typography>
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                padding: 3
              }}>
              <RecyclingIcon color="primary" />
              <Typography color="primary" variant="h5">
                {pontosColeta.length}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>

      <Box sx={{ display: "grid", gap: 2, maxWidth: 1000, mt: 4, mx: "auto" }}>
        {pontosColeta.map((pontoColeta) => {
          return (
            <PontoColetaCard
              key={pontoColeta.id}
              pontoColeta={pontoColeta}
              zoom={13}
              scrollWheelZoom={false}
              onclickEditar={() => handleEdit(pontoColeta.id)}
              onclickDeletar={() => handleDelete(pontoColeta.id)}
            />
          );
        })}
      </Box>
    </>
  );
}

export default PaginaHome;
