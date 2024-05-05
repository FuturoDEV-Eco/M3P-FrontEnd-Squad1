import { Container, Typography } from "@mui/material";
import FormCadastroUsuario from "../../components/FormCadastroUsuario";
function PaginaCadastroUsuario() {
  return (
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
  );
}

export default PaginaCadastroUsuario;
