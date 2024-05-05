import { Box, Button, Typography } from "@mui/material";
import Input from "../Input/Index";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { UsuariosContext } from "../../contexts/Usuarios/UsuariosContext";
function FormLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const { login } = useContext(UsuariosContext);

  const onSubmit = async (data) => {
    const { email, senha } = data;
    await login(email, senha);
  };

  return (
    <Box
      component="form"
      sx={{ display: "grid", gap: 2 }}
      mt={3}
      onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="email"
        label="Email"
        type="email"
        fullWidth
        register={register("email", {
          required: "O email é obrigatório",
          validate: {
            matchPath: (v) =>
              /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/.test(v)
          }
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <Input
        id="senha"
        label="Senha"
        type="password"
        register={register("senha", {
          required: "A senha é obrigatória",
          minLength: {
            value: 6,
            message: "A senha deve ter no mínimo 6 caracteres"
          }
        })}
        error={!!errors.senha}
        helperText={errors.senha?.message}
      />

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
