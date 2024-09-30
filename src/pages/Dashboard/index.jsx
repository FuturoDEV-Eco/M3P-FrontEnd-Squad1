import { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import CardInfo from "../../components/CardInfo";
import ColetaList from "../../components/ColetaList";
import MapView from "../../components/MapView";

import RecyclingIcon from "@mui/icons-material/Recycling";
import PeopleIcon from "@mui/icons-material/People";

const Dashboard = () => {
  const [pontosColeta, setPontosColeta] = useState([]);
  const [usuariosAtivos, setUsuariosAtivos] = useState(0); // Mock para usuários ativos

  useEffect(() => {
    fetchPontosColeta();
    // Mock: Quantidade de usuários ativos
    setUsuariosAtivos(123); // Você pode substituir isso pela lógica real
  }, []);

  const fetchPontosColeta = async () => {
    try {
      const response = await fetch("http://localhost:3000/locaisColeta");
      const data = await response.json();
      setPontosColeta(data);
    } catch (error) {
      console.error("Erro ao carregar os pontos de coleta:", error);
    }
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <CardInfo title="Usuários Ativos" value={usuariosAtivos} icon={<PeopleIcon />} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardInfo title="Pontos de Coleta" value={pontosColeta.length} icon={<RecyclingIcon />} />
        </Grid>
        <Grid item xs={12}>
          <MapView pontosColeta={pontosColeta} />
        </Grid>
        <Grid item xs={12}>
          <ColetaList pontosColeta={pontosColeta} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
