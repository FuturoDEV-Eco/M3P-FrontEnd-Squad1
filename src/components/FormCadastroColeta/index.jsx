import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
} from "@mui/material";
import Input from "../Input/Index";
import { ViaCepService } from "../../services/ViaCepService"; // Serviço de busca do ViaCEP
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PontosColetaContext } from "../../contexts/PontosColeta/PontosColetaContext";

// Opções de resíduos disponíveis
const residuosOptions = [
  "Vidro",
  "Metal",
  "Papel",
  "Plástico",
  "Orgânico",
  "Baterias",
];

function FormCadastroColeta({ pontoColeta }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedResiduos, setSelectedResiduos] = useState([]);
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
      const tiposResiduo = pontoColeta.tipoResiduo || [];
      setValue("tipoResiduo", tiposResiduo);
      setSelectedResiduos(tiposResiduo);
    } else {
      setIsEditMode(false);
      setSelectedResiduos([]);
    }
  }, [pontoColeta, setValue]);

  const buscarEnderecoPorCep = async () => {
    const cep = getValues("localizacao.cep");
    try {
      const response = await ViaCepService.Get(cep);
      if (response) {
        setValue("localizacao.logradouro", response.logradouro);
        setValue("localizacao.bairro", response.bairro);
        setValue("localizacao.cidade", response.localidade);
        setValue("localizacao.estado", response.uf);

        // Adiciona o timer para buscar latitude e longitude no Nominatim 2 segundos após preencher os campos do endereço
        setTimeout(() => {
          buscarLatitudeLongitude();
        }, 2000);
      }
    } catch (error) {
      console.error("Erro ao buscar o CEP: ", error);
    }
  };

  // Função para buscar latitude e longitude no Nominatim
  const buscarLatitudeLongitude = async () => {
    const { logradouro, bairro, cidade, estado } = getValues("localizacao");
    const enderecoCompleto = `${logradouro}, ${bairro}, ${cidade}, ${estado}, Brasil`;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          enderecoCompleto
        )}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setValue("latitude", lat);
        setValue("longitude", lon);
      }
    } catch (error) {
      console.error("Erro ao buscar coordenadas no Nominatim: ", error);
    }
  };

  const handleCepBlur = () => {
    buscarEnderecoPorCep();
  };

  const onSubmit = (data) => {
    const localizacao = {
      cep: data.localizacao.cep,
      logradouro: data.localizacao.logradouro,
      numero: data.localizacao.numero,
      bairro: data.localizacao.bairro,
      cidade: data.localizacao.cidade,
      estado: data.localizacao.estado,
    };

    const novoPontoColeta = {
      id: 0,
      nome: data.nome,
      descricao: data.descricao,
      usuarioId: usuarioLogado.id,
      localizacao: localizacao,
      latitude: Number(data.latitude),
      longitude: Number(data.longitude),
      tipoResiduo: data.tipoResiduo, // Agora armazenado como array
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
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Input
            id="nome"
            label="Nome"
            type="text"
            register={register("nome", { required: "O nome é obrigatório" })}
            error={!!errors.nome}
            helperText={errors.nome?.message}
            InputLabelProps={{ shrink: true }} // Propriedade shrink para evitar sobreposição da label
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="tipoResiduo-label">Tipo Resíduo</InputLabel>
            <Select
              labelId="tipoResiduo-label"
              id="tipoResiduo"
              multiple
              value={selectedResiduos}
              onChange={(event) => {
                const value = event.target.value;
                setSelectedResiduos(value);
                setValue("tipoResiduo", value);
              }}
              renderValue={(selected) => selected.join(", ")}
              error={!!errors.tipoResiduo}
            >
              {residuosOptions.map((residuo) => (
                <MenuItem key={residuo} value={residuo}>
                  <Checkbox checked={selectedResiduos.indexOf(residuo) > -1} />
                  <ListItemText primary={residuo} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
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
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
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
            InputLabelProps={{ shrink: true }}
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
            InputLabelProps={{ shrink: true }}
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
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            id="bairro"
            label="Bairro"
            type="text"
            register={register("localizacao.bairro", {
              required: "O bairro é obrigatório",
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
              required: "A cidade é obrigatória",
            })}
            error={!!errors.localizacao?.cidade}
            helperText={errors.localizacao?.cidade?.message}
            InputLabelProps={{ shrink: true }}
          />{" "}
        </Grid>{" "}
        <Grid item xs={12} sm={3}>
          {" "}
          <Input
            id="estado"
            label="Estado"
            type="text"
            register={register("localizacao.estado", {
              required: "O estado é obrigatório",
            })}
            error={!!errors.localizacao?.estado}
            helperText={errors.localizacao?.estado?.message}
            InputLabelProps={{ shrink: true }}
          />{" "}
        </Grid>{" "}
        <Grid item xs={12} sm={6}>
          {" "}
          <Input
            id="latitude"
            label="Latitude"
            type="text"
            register={register("latitude", {
              required: "A latitude é obrigatória",
            })}
            error={!!errors.latitude}
            helperText={errors.latitude?.message}
            InputLabelProps={{ shrink: true }}
          />{" "}
        </Grid>{" "}
        <Grid item xs={12} sm={6}>
          {" "}
          <Input
            id="longitude"
            label="Longitude"
            type="text"
            register={register("longitude", {
              required: "A longitude é obrigatória",
            })}
            error={!!errors.longitude}
            helperText={errors.longitude?.message}
            InputLabelProps={{ shrink: true }}
          />{" "}
        </Grid>{" "}
      </Grid>{" "}
      <Button variant="contained" type="submit">
        {" "}
        {isEditMode ? "Editar" : "Cadastrar"}{" "}
      </Button>{" "}
    </Box>
  );
}

export default FormCadastroColeta;
