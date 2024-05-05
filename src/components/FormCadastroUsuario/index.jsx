import { Box, Button, Grid, MenuItem, Typography } from "@mui/material";
import Input from "../Input/Index";
import { Link } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import { estados } from "../../utils/estados";

function FormCadastroUsuario() {
  return (
    <Box component="form" sx={{ display: "grid", gap: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Input id="nome" label="Nome" type="text" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input id="cpf" label="Cpf" type="text" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DatePicker
            name="dataNascimento"
            label="Data de Nascimento"
            sx={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input select id="sexo" label="sexo">
            <MenuItem defaultValue=""></MenuItem>
            <MenuItem value="feminino">Feminino</MenuItem>
            <MenuItem value="masculino">Masculino</MenuItem>
          </Input>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input id="email" label="Email" type="email" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input id="password" label="Senha" type="password" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Input id="cep" label="Cep" type="text" />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Input id="logradouro" label="Logradouro" type="text" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Input id="numero" label="Número" type="text" />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Input id="bairro" label="Bairro" type="text" />
        </Grid>
        <Grid item xs={12} sm={8}>
          <Input id="cidade" label="Cidade" type="text" />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Input select id="estado" label="Estado" type="text">
            <MenuItem defaultValue="">Selecione um estado</MenuItem>
            {estados.map((estado, index) => {
              return (
                <MenuItem key={index} value={estado}>
                  {estado}
                </MenuItem>
              );
            })}
          </Input>
        </Grid>
      </Grid>
      <Button variant="contained" type="submit">
        Cadastrar
      </Button>
      <Typography align="center" variant="subtitle2">
        Já possui uma conta? &nbsp;
        <Typography component={Link} to="/login" color="primary">
          Logar
        </Typography>
      </Typography>
    </Box>
  );
}

export default FormCadastroUsuario;
