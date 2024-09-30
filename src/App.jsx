import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import { Container } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import RecyclingIcon from "@mui/icons-material/Recycling";
import AddLocationIcon from "@mui/icons-material/AddLocation";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { PontosColetaContextProvider } from "./contexts/PontosColeta/PontosColetaContext";

function App() {
  const navArrayLinks = [
    {
      title: "Home",
      path: "/",
      icon: <HomeIcon />
    },
    {
      title: "Lista Pontos de Coleta",
      path: "/coleta/lista",
      icon: <RecyclingIcon />
    },
    {
      title: "Cadastro Pontos de Coleta",
      path: "/coleta/cadastro",
      icon: <AddLocationIcon />
    },
    {
      title: "Sair",
      icon: <ExitToAppIcon />
    }
  ];

  return (
    <PontosColetaContextProvider>
      <Navbar navArrayLinks={navArrayLinks} />
      <Container sx={{ mt: 5 }}>
        <Outlet /> {/* Isso mantém o carregamento das rotas */}
      </Container>
    </PontosColetaContextProvider>
  );
}

export default App;
