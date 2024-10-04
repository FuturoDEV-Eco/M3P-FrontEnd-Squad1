import { useState, useContext } from "react"; // Certifique-se de importar useState e useContext
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography
} from "@mui/material";
import PontoColetaCard from "../../components/PontoColetaCard";
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

  const [clickCount, setClickCount] = useState(0); // Contador de cliques
  const [timeoutId, setTimeoutId] = useState(null); // Para armazenar o ID do timeout

  function handleEdit(id) {
    navigate(`/coleta/cadastro/${id}`);
  }

  async function handleDelete(id) {
    await deletarLocalColeta(id);
    await getPontosColeta();
  }

  const handleCardClick = () => {
    setClickCount((prevCount) => {
      const newCount = prevCount + 1;

      // Verifica se o novo contador atingiu 10
      if (newCount === 10) {
        alert("Clicar nesse card várias vezes não muda nada, reciclar seu lixo sim! Já reciclou seu lixo hoje? 🚮 🌍 ♻️");
        return 0; // Reseta o contador após o alerta
      }

      // Reseta o contador após 1 segundo se não atingir 10 cliques
      if (timeoutId) {
        clearTimeout(timeoutId); // Limpa o timeout anterior
      }

      const id = setTimeout(() => {
        setClickCount(0); // Reseta o contador após 1 segundo
      }, 1000);
      setTimeoutId(id); // Armazena o ID do novo timeout

      return newCount; // Retorna o novo contador
    });
  };

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
          <CardActionArea sx={{ p: 2 }} onClick={handleCardClick}>
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
