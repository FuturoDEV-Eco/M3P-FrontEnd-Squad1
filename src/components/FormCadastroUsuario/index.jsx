import { Box, Button, Grid, MenuItem, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import customParseFormat from "dayjs/plugin/customParseFormat";
import Input from "../Input/Index";
import { Link } from "react-router-dom";
import { ViaCepService } from "../../services/ViaCepService";
import { useForm } from "react-hook-form";
import { FormatarCpf, formatarCep } from "../../utils/formatar/Formatadores";
import { useContext } from "react";
import { UsuariosContext } from "../../contexts/Usuarios/UsuariosContext";

dayjs.extend(customParseFormat);

function FormCadastroUsuario() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: {
      nome: "",
      cpf: "",
      dataNascimento: null,
      sexo: "",
      email: "",
      senha: "",
      endereco: {
        cep: "",
        logradouro: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        estado: ""
      }
    }
  });

  const { cadastrarUsuario } = useContext(UsuariosContext);

  const buscarEnderecoPorCep = async () => {
    let cep = getValues("endereco.cep");
    try {
      const response = await ViaCepService.Get(cep);
      if (response) {
        setValue("endereco.logradouro", response.logradouro);
        setValue("endereco.bairro", response.bairro);
        setValue("endereco.cidade", response.localidade);
        setValue("endereco.estado", response.uf);
      }
    } catch (error) {
      console.error("Erro ao buscar o CEP: ", error);
    }
  };

  const handleCepBlur = () => {
    const debounceTimer = setTimeout(async () => {
      await buscarEnderecoPorCep();
    }, 500);

    return () => clearTimeout(debounceTimer);
  };

  const onSubmit = (data) => {
    const endereco = {
      cep: formatarCep(getValues("endereco.cep")),
      logradouro: getValues("endereco.logradouro"),
      numero: getValues("endereco.numero"),
      complemento: getValues("endereco.complemento"),
      bairro: getValues("endereco.bairro"),
      cidade: getValues("endereco.cidade"),
      estado: getValues("endereco.estado")
    };

    const usuario = {
      id: 0,
      nome: data.nome,
      cpf: FormatarCpf(data.cpf),
      dataNascimento: data.dataNascimento,
      sexo: data.sexo,
      email: data.email,
      senha: data.senha,
      endereco: endereco
    };

    cadastrarUsuario(usuario);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <Box
        component="form"
        sx={{ display: "grid", gap: 2 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={2}>
          {/* Campo Nome (1 linha inteira) */}
          <Grid item xs={12}>
            <Input
              id="nome"
              label="Nome"
              type="text"
              inputProps={register("nome", { required: "O nome é obrigatório" })}
              error={!!errors.nome}
              helperText={errors.nome?.message}
            />
          </Grid>

          {/* CPF, Data de Nascimento e Sexo (1/3 cada) */}
          <Grid item xs={12} sm={4}>
            <Input
              id="cpf"
              label="CPF"
              type="text"
              inputProps={register("cpf", { required: "O CPF é obrigatório" })}
              error={!!errors.cpf}
              helperText={errors.cpf?.message}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <DatePicker
              label="Data de Nascimento"
              value={getValues("dataNascimento")}
              onChange={(newValue) => setValue("dataNascimento", newValue)}
              renderInput={(params) => (
                <Input
                  {...params}
                  error={!!errors.dataNascimento}
                  helperText={errors.dataNascimento?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Input
              select
              id="sexo"
              label="Sexo"
              defaultValue=""
              inputProps={register("sexo", {
                required: "O campo sexo é obrigatório"
              })}
              error={!!errors.sexo}
              helperText={errors.sexo?.message}
            >
              <MenuItem value="" disabled>
                Selecione
              </MenuItem>
              <MenuItem value="feminino">Feminino</MenuItem>
              <MenuItem value="masculino">Masculino</MenuItem>
            </Input>
          </Grid>

          {/* Email e Senha (1/2 cada) */}
          <Grid item xs={12} sm={6}>
            <Input
              id="email"
              label="E-Mail"
              type="email"
              inputProps={register("email", {
                required: "O e-mail é obrigatório",
                validate: {
                  matchPath: (v) =>
                    /^\w+([.-]?\w+)@\w+([.-]?\w+)(\.\w{2,3})+$/.test(v)
                }
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              id="senha"
              label="Senha"
              type="password"
              inputProps={register("senha", {
                required: "A senha é obrigatória",
                minLength: {
                  value: 6,
                  message: "A senha deve ter no mínimo 6 caracteres"
                }
              })}
              error={!!errors.senha}
              helperText={errors.senha?.message}
            />
          </Grid>

          {/* CEP (1/3) e Logradouro (2/3) */}
          <Grid item xs={12} sm={4}>
            <Input
              id="cep"
              label="CEP"
              type="text"
              inputProps={register("endereco.cep", {
                required: "O CEP é obrigatório",
                onBlur: handleCepBlur
              })}
              error={!!errors.endereco?.cep}
              helperText={errors.endereco?.cep?.message}
              InputLabelProps={{ shrink: true }} // Adicionando shrink
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <Input
              id="logradouro"
              label="Logradouro"
              type="text"
              inputProps={register("endereco.logradouro", {
                required: "O logradouro é obrigatório"
              })}
              error={!!errors.endereco?.logradouro}
              helperText={errors.endereco?.logradouro?.message}
              InputLabelProps={{ shrink: true }} // Adicionando shrink
            />
          </Grid>

          {/* Número, Complemento e Bairro (1/3 cada) */}
          <Grid item xs={12} sm={4}>
            <Input
              id="numero"
              label="Número"
              type="text"
              inputProps={register("endereco.numero", {
                required: "O número é obrigatório"
              })}
              error={!!errors.endereco?.numero}
              helperText={errors.endereco?.numero?.message}
              InputLabelProps={{ shrink: true }} // Adicionando shrink
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Input
              id="complemento"
              label="Complemento"
              type="text"
              inputProps={register("endereco.complemento")}
              InputLabelProps={{ shrink: true }} // Adicionando shrink
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Input
              id="bairro"
              label="Bairro"
              type="text"
              inputProps={register("endereco.bairro", {
                required: "O bairro é obrigatório"
              })}
              error={!!errors.endereco?.bairro}
              helperText={errors.endereco?.bairro?.message}
              InputLabelProps={{ shrink: true }} // Adicionando shrink
            />
          </Grid>

          {/* Cidade e Estado (1/2 cada) */}
          <Grid item xs={12} sm={6}>
            <Input
              id="cidade"
              label="Cidade"
              type="text"
              inputProps={register("endereco.cidade", {
                required: "A cidade é obrigatória"
              })}
              error={!!errors.endereco?.cidade}
              helperText={errors.endereco?.cidade?.message}
              InputLabelProps={{ shrink: true }} // Adicionando shrink
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Input
              id="estado"
              label="Estado"
              type="text"
              inputProps={register("endereco.estado", {
                required: "O estado é obrigatório"
              })}
              error={!!errors.endereco?.estado}
              helperText={errors.endereco?.estado?.message}
              InputLabelProps={{ shrink: true }} // Adicionando shrink
            />
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
    </LocalizationProvider>
  );
}

export default FormCadastroUsuario;
