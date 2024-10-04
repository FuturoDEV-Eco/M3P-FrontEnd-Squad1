import { Container, Typography } from "@mui/material";
import FormCadastroUsuario from "../../components/FormCadastroUsuario";
import NavMenu from "../../components/NavMenu";

// Defina os links de navegação
const navArrayLinks = [
  { title: "Dashboard", path: "/dashboard" },
  { title: "Cadastro", path: "/usuario/cadastro" },
  { title: "Login", path: "/login" }
];

function PaginaCadastroUsuario() {
  return (
    <>
    <NavMenu navArrayLinks={navArrayLinks} />
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "1rem auto"
      }}>
      <Typography variant="h3" component="h1" align="center" color="primary">
        Cadastro
      </Typography>
      <FormCadastroUsuario />
    </Container>
    </>
  );
}

export default PaginaCadastroUsuario;
