import { Box, Button, Typography } from "@mui/material";
import Input from "../Input/Index";
import { Link } from "react-router-dom";
function FormLogin() {
  return (
    <Box component="form" sx={{ display: "grid", gap: 2 }} mt={3}>
      <Input id="email" label="Email" type="email" />
      <Input id="password" label="Senha" type="password" />
      <Button variant="contained" type="submit">
        Logar
      </Button>
      <Typography align="center" variant="subtitle2">
        Não tem uma conta? &nbsp;
        <Typography component={Link} to="/usuario/cadastro" color="primary">
          Registre-se
        </Typography>
      </Typography>
    </Box>
  );
}

export default FormLogin;
