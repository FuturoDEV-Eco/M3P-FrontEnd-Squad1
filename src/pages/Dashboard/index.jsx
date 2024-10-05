import { useEffect, useState } from "react";
import { Container, Grid } from "@mui/material";
import CardInfo from "../../components/CardInfo";
import ColetaList from "../../components/ColetaList";
import MapView from "../../components/MapView";
import PeopleIcon from "@mui/icons-material/People";
import LocationOnIcon from "@mui/icons-material/LocationOn"; // Ícone de localização
import NavMenu from "../../components/NavMenu";
import { Api } from "../../services/api";

// Defina os links de navegação
const navArrayLinks = [
  { title: "Dashboard", path: "/dashboard" },
  { title: "Cadastro", path: "/usuario/cadastro" },
  { title: "Login", path: "/login" }
];

const Dashboard = () => {
  const [pontosColeta, setPontosColeta] = useState([]);
  const [totalPontosColeta, setTotalPontosColeta] = useState(0);
  const [totalUsuariosCadastrados, setTotalUsuariosCadastrados] = useState(0); // Quantidade de usuários cadastrados

  useEffect(() => {
    fetchDashboard();
    fetchTotalPontosColeta();
    fetchTotalUsuariosCadastrados(); // Chama a função para buscar usuários cadastrados
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await Api.get("/dashboard");
      setPontosColeta(response.data);
    } catch (error) {
      console.error("Erro ao listar os locais da dashboard:", error);
    }
  };

  const fetchTotalPontosColeta = async () => {
    try {
      const response = await Api.get("/dashboard/totalLocais");
      setTotalPontosColeta(response.data);
      /* const response = await fetch("http://localhost:3000/locaisColeta");
      const data = await response.json();
      setPontosColeta(data); */
    } catch (error) {
      console.error("Erro ao carregar os pontos de coleta:", error);
    }
  };

  const fetchTotalUsuariosCadastrados = async () => {
    try {
      const reponse = await Api.get("/dashboard/totalUsuarios");
      setTotalUsuariosCadastrados(reponse.data);
      /* const response = await fetch("http://localhost:3000/usuarios");
      const data = await response.json();
      setUsuariosCadastrados(data.length); // Exibe a quantidade de usuários */
    } catch (error) {
      console.error("Erro ao carregar os usuários cadastrados:", error);
    }
  };

  return (
    <>
      <NavMenu navArrayLinks={navArrayLinks} />
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <CardInfo
              title="Usuários Cadastrados"
              value={totalUsuariosCadastrados}
              icon={<PeopleIcon />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <CardInfo
              title="Pontos de Coleta"
              value={totalPontosColeta}
              icon={<LocationOnIcon />} // Novo ícone de localização
            />
          </Grid>
          <Grid item xs={12}>
            <MapView pontosColeta={pontosColeta} />
          </Grid>
          <Grid item xs={12}>
            <ColetaList pontosColeta={pontosColeta} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
