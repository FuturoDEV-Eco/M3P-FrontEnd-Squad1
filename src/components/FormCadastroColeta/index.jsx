import { Box, Button, Grid, MenuItem } from "@mui/material";
import Input from "../Input/Index";
import { ViaCepService } from "../../services/ViaCepService";
import { useForm } from "react-hook-form";
import { formatarCep } from "../../utils/formatar/Formatadores";
import { PontosColetaContext } from "../../contexts/PontosColeta/PontosColetaContext";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FormCadastroColeta({ pontoColeta }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors }
  } = useForm({
    defaultValues: {
      nome: "",
      descricao: "",
      usuarioId: 0,
      localizacao: {
        cep: "",
        logradouro: "",
        numero: "",
        bairro: "",
        cidade: "",
        estado: ""
      },
      latitude: "",
      longitude: "",
      tipoResiduo: ""
    }
  });

  const navigate = useNavigate();

  const usuarioLogado = JSON.parse(localStorage.getItem("user"));

  const { cadastrarPontoColeta, editarPontoColeta } =
    useContext(PontosColetaContext);

  useEffect(() => {
    if (pontoColeta) {
      console.log(pontoColeta);
      setIsEditMode(true);
      setValue("nome", pontoColeta.nome);
      setValue("descricao", pontoColeta.descricao);
      setValue("localizacao.cep", pontoColeta.localizacao?.cep);
      setValue("localizacao.logradouro", pontoColeta.localizacao?.logradouro);
      setValue("localizacao.numero", pontoColeta.localizacao?.numero);
      setValue("localizacao.bairro", pontoColeta.localizacao?.bairro);
      setValue("localizacao.cidade", pontoColeta.localizacao?.cidade);
      setValue("localizacao.estado", pontoColeta.localizacao?.estado);
      setValue("latitude", pontoColeta.latitude);
      setValue("longitude", pontoColeta.longitude);
      setValue("tipoResiduo", pontoColeta.tipoResiduo);
    } else {
      setIsEditMode(false);
    }
  }, [pontoColeta]);

  const buscarEnderecoPorCep = async () => {
    let cep = getValues("localizacao.cep");
    try {
      const response = await ViaCepService.Get(cep);
      if (response) {
        setValue("localizacao.logradouro", response.logradouro);
        setValue("localizacao.bairro", response.bairro);
        setValue("localizacao.cidade", response.localidade);
        setValue("localizacao.estado", response.uf);
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
    const localizacao = {
      cep: formatarCep(getValues("localizacao.cep")),
      logradouro: getValues("localizacao.logradouro"),
      numero: getValues("localizacao.numero"),
      bairro: getValues("localizacao.bairro"),
      cidade: getValues("localizacao.cidade"),
      estado: getValues("localizacao.estado")
    };

    const novoPontoColeta = {
      id: 0,
      nome: data.nome,
      descricao: data.descricao,
      usuarioId: usuarioLogado.id,
      localizacao: localizacao,
      latitude: Number(data.latitude),
      longitude: Number(data.longitude),
      tipoResiduo: data.tipoResiduo
    };

    if (isEditMode) {
      editarPontoColeta(novoPontoColeta, pontoColeta.id);
      setIsEditMode(false);
      navigate("/");
    } else {
      cadastrarPontoColeta(novoPontoColeta);
      navigate("/");
    }
  };

  return (
    <Box
      component="form"
      sx={{ display: "grid", gap: 1 }}
      onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          {!isEditMode ? (
            <Input
              id="nome"
              label="Nome"
              type="text"
              register={register("nome", { required: "O nome é obrigatório" })}
              error={!!errors.nome}
              helperText={errors.nome?.message}
            />
          ) : (
            <Input
              id="nome"
              label="Nome"
              type="text"
              register={register("nome", { required: "O nome é obrigatório" })}
              error={!!errors.nome}
              helperText={errors.nome?.message}
              InputLabelProps={{ shrink: true }}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {!isEditMode ? (
            <Input
              id="tipoResiduo"
              label="Tipo Resíduo"
              type="text"
              register={register("tipoResiduo", {
                required: "O campo tipoResiduo é obrigatório"
              })}
              error={!!errors.tipoResiduo}
              helperText={errors.tipoResiduo?.message}
            />
          ) : (
            <Input
              id="tipoResiduo"
              label="Tipo Resíduo"
              type="text"
              register={register("tipoResiduo", {
                required: "O campo tipoResiduo é obrigatório"
              })}
              error={!!errors.tipoResiduo}
              helperText={errors.tipoResiduo?.message}
              InputLabelProps={{ shrink: true }}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={12}>
          {!isEditMode ? (
            <Input
              id="descricao"
              label="Descrição"
              multiline
              type="text"
              register={register("descricao", {
                required: "A descrição é obrigatória"
              })}
              error={!!errors.descricao}
              helperText={errors.descricao?.message}
            />
          ) : (
            <Input
              id="descricao"
              label="Descrição"
              multiline
              type="text"
              register={register("descricao", {
                required: "A descrição é obrigatória"
              })}
              error={!!errors.descricao}
              helperText={errors.descricao?.message}
              InputLabelProps={{ shrink: true }}
            />
          )}
        </Grid>

        <Grid item xs={12} sm={3}>
          {!isEditMode ? (
            <Input
              id="cep"
              label="Cep"
              type="text"
              register={register("localizacao.cep", {
                required: "O cep é obrigatório",
                onBlur: () => handleCepBlur()
              })}
              error={!!errors.localizacao?.cep}
              helperText={errors.localizacao?.cep?.message}
            />
          ) : (
            <Input
              id="cep"
              label="Cep"
              type="text"
              register={register("localizacao.cep", {
                required: "O cep é obrigatório",
                onBlur: () => handleCepBlur()
              })}
              error={!!errors.localizacao?.cep}
              helperText={errors.localizacao?.cep?.message}
              InputLabelProps={{ shrink: true }}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            id="logradouro"
            label="Logradouro"
            type="text"
            register={register("localizacao.logradouro", {
              required: "O logradouro é obrigatório"
            })}
            error={!!errors.localizacao?.logradouro}
            helperText={errors.localizacao?.logradouro?.message}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          {!isEditMode ? (
            <Input
              id="numero"
              label="Número"
              type="text"
              register={register("localizacao.numero", {
                required: "O número é obrigatório"
              })}
              error={!!errors.localizacao?.numero}
              helperText={errors.localizacao?.numero?.message}
            />
          ) : (
            <Input
              id="numero"
              label="Número"
              type="text"
              register={register("localizacao.numero", {
                required: "O número é obrigatório"
              })}
              error={!!errors.localizacao?.numero}
              helperText={errors.localizacao?.numero?.message}
              InputLabelProps={{ shrink: true }}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            id="bairro"
            label="Bairro"
            type="text"
            register={register("localizacao.bairro", {
              required: "O bairro é obrigatório"
            })}
            error={!!errors.localizacao?.bairro}
            helperText={errors.localizacao?.bairro?.message}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Input
            id="cidade"
            label="Cidade"
            type="text"
            register={register("localizacao.cidade", {
              required: "A cidade é obrigatória"
            })}
            error={!!errors.localizacao?.cidade}
            helperText={errors.localizacao?.cidade?.message}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Input
            id="estado"
            label="Estado"
            type="text"
            register={register("localizacao.estado", {
              required: "O estado é obrigatório"
            })}
            error={!!errors.localizacao?.estado}
            helperText={errors.localizacao?.estado?.message}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          {!isEditMode ? (
            <Input
              id="latitude"
              label="Latitude"
              type="text"
              register={register("latitude", {
                required: "A latitude é obrigatória"
              })}
              error={!!errors.latitude}
              helperText={errors.latitude?.message}
            />
          ) : (
            <Input
              id="latitude"
              label="Latitude"
              type="text"
              register={register("latitude", {
                required: "A latitude é obrigatória"
              })}
              error={!!errors.latitude}
              helperText={errors.latitude?.message}
              InputLabelProps={{ shrink: true }}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          {!isEditMode ? (
            <Input
              id="longitude"
              label="Longitude"
              type="text"
              register={register("longitude", {
                required: "A longitude é obrigatória"
              })}
              error={!!errors.longitude}
              helperText={errors.longitude?.message}
            />
          ) : (
            <Input
              id="longitude"
              label="Longitude"
              type="text"
              register={register("longitude", {
                required: "A longitude é obrigatória"
              })}
              error={!!errors.longitude}
              helperText={errors.longitude?.message}
              InputLabelProps={{ shrink: true }}
            />
          )}
        </Grid>
        <Grid item xs={12} sm={4} sx={{ mb: 2, mx: "auto" }}>
          <Button variant="contained" type="submit" fullWidth>
            Cadastrar
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FormCadastroColeta;
