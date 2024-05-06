import { Typography } from "@mui/material";
import FormCadastroColeta from "../../components/FormCadastroColeta";

function PaginaCadastroColeta() {
  return (
    <>
      <Typography variant="h4" sx={{ mb: { xs: 1, md: 3 } }}>
        Cadastro Pontos de Coleta
      </Typography>
      <FormCadastroColeta />
    </>
  );
}

export default PaginaCadastroColeta;
