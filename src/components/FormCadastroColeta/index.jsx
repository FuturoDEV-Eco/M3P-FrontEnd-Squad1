import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
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
    formState: { errors },
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
        estado: "",
      },
      latitude: "",
      longitude: "",
      tipoResiduo: [],
    },
  });

  const navigate = useNavigate();
  const usuarioLogado = JSON.parse(localStorage.getItem("user"));
  const { cadastrarPontoColeta, editarPontoColeta } =
    useContext(PontosColetaContext);

  useEffect(() => {
    if (pontoColeta) {
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
  }, [pontoColeta, setValue]);

  const buscarCoordenadasPorEndereco = async (endereco) => {
    const query = `${endereco.logradouro}, ${endereco.numero}, ${endereco.bairro}, ${endereco.cidade}, ${endereco.estado}`;
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      query
    )}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.length > 0) {
        setValue("latitude", data[0].lat);
        setValue("longitude", data[0].lon);
      } else {
        console.error("Endereço não encontrado no Nominatim.");
      }
    } catch (error) {
      console.error("Erro ao buscar coordenadas: ", error);
    }
  };

  const buscarEnderecoPorCep = async () => {
    let cep = getValues("localizacao.cep");
    try {
      const response = await ViaCepService.Get(cep);
      if (response) {
        setValue("localizacao.logradouro", response.logradouro);
        setValue("localizacao.bairro", response.bairro);
        setValue("localizacao.cidade", response.localidade);
        setValue("localizacao.estado", response.uf);

        await buscarCoordenadasPorEndereco(response);
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
      estado: getValues("localizacao.estado"),
    };

    const novoPontoColeta = {
      id: 0,
      nome: data.nome,
      descricao: data.descricao,
      usuarioId: usuarioLogado.id,
      localizacao: localizacao,
      latitude: Number(data.latitude),
      longitude: Number(data.longitude),
      tipoResiduo: data.tipoResiduo,
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

  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${getValues(
    "latitude"
  )},${getValues("longitude")}`;

  return (
    <Box
      component="form"
      sx={{ display: "grid", gap: 1 }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container spacing={2}>
        {/* Nome do Local */}
        <Grid item xs={12} sm={6}>
          <Input
            id="nome"
            label="Nome"
            type="text"
            register={register("nome", { required: "O nome é obrigatório" })}
            error={!!errors.nome}
            helperText={errors.nome?.message}
          />
        </Grid>

        {/* Tipo de Resíduo */}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="tipoResiduo-label">Tipos de Resíduos</InputLabel>
            <Select
              labelId="tipoResiduo-label"
              id="tipoResiduo"
              multiple
              value={getValues("tipoResiduo") || []} // Garante que o valor seja sempre um array
              onChange={(e) => setValue("tipoResiduo", e.target.value)}
              renderValue={(selected) => selected.join(", ")}
            >
              {[
                "Vidro",
                "Metal",
                "Papel",
                "Plástico",
                "Orgânico",
                "Baterias",
              ].map((residuo) => (
                <MenuItem key={residuo} value={residuo}>
                  {residuo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Descrição */}
        <Grid item xs={12}>
          <Input
            id="descricao"
            label="Descrição"
            multiline
            type="text"
            register={register("descricao", {
              required: "A descrição é obrigatória",
            })}
            error={!!errors.descricao}
            helperText={errors.descricao?.message}
          />
        </Grid>

        {/* CEP e Logradouro */}
        <Grid item xs={12} sm={3}>
          <Input
            id="cep"
            label="Cep"
            type="text"
            register={register("localizacao.cep", {
              required: "O cep é obrigatório",
              onBlur: handleCepBlur,
            })}
            error={!!errors.localizacao?.cep}
            helperText={errors.localizacao?.cep?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            id="logradouro"
            label="Logradouro"
            type="text"
            register={register("localizacao.logradouro", {
              required: "O logradouro é obrigatório",
            })}
            error={!!errors.localizacao?.logradouro}
            helperText={errors.localizacao?.logradouro?.message}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Input
            id="numero"
            label="Número"
            type="text"
            register={register("localizacao.numero", {
              required: "O número é obrigatório",
            })}
            error={!!errors.localizacao?.numero}
            helperText={errors.localizacao?.numero?.message}
          />
        </Grid>

        {/* Bairro, Cidade e Estado */}
        <Grid item xs={12} sm={4}>
          <Input
            id="bairro"
            label="Bairro"
            type="text"
            register={register("localizacao.bairro", {
              required: "O bairro é obrigatório",
            })}
            error={!!errors.localizacao?.bairro}
            helperText={errors.localizacao?.bairro?.message}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Input
            id="cidade"
            label="Cidade"
            type="text"
            register={register("localizacao.cidade", {
              required: "A cidade é obrigatória",
            })}
            error={!!errors.localizacao?.cidade}
            helperText={errors.localizacao?.cidade?.message}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Input
            id="estado"
            label="Estado"
            type="text"
            register={register("localizacao.estado", {
              required: "O estado é obrigatório",
            })}
            error={!!errors.localizacao?.estado}
            helperText={errors.localizacao?.estado?.message}
          />
        </Grid>

        {/* Latitude e Longitude */}
        <Grid item xs={12} sm={6}>
          <Input
            id="latitude"
            label="Latitude"
            type="text"
            register={register("latitude", {
              required: "A latitude é obrigatória",
            })}
            error={!!errors.latitude}
            helperText={errors.latitude?.message}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            id="longitude"
            label="Longitude"
            type="text"
            register={register("longitude", {
              required: "A longitude é obrigatória",
            })}
            error={!!errors.longitude}
            helperText={errors.longitude?.message}
          />
        </Grid>

        {/* Link para o Google Maps */}
        <Grid item xs={12}>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Link para o Google Maps:{" "}
            <a href={googleMapsLink} target="_blank" rel="noopener noreferrer">
              {googleMapsLink}
            </a>
          </Typography>
        </Grid>

        {/* Botões de Ação */}
        <Grid item xs={12}>
          <Button variant="contained" type="submit">
            {isEditMode ? "Atualizar" : "Cadastrar"} Ponto de Coleta
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FormCadastroColeta;
