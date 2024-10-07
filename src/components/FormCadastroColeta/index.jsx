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
  Typography
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
  "Baterias"
];

function FormCadastroColeta({ pontoColeta }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedResiduos, setSelectedResiduos] = useState([]);
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
      usuario_id: 0,
      cep: "",
      logradouro: "",
      numero: "",
      bairro: "",
      localidade: "",
      uf: "",
      latitude: "",
      longitude: "",
      tipos_residuo: []
    }
  });

  const [linkMaps, setLinkMaps] = useState("");

  const navigate = useNavigate();
  const usuarioLogado = JSON.parse(sessionStorage.getItem("@Auth:user"));
  const { cadastrarPontoColeta, editarPontoColeta } =
    useContext(PontosColetaContext);

  useEffect(() => {
    if (pontoColeta && pontoColeta.id) {
      setIsEditMode(true);
      setValue("nome", pontoColeta.nome);
      setValue("descricao", pontoColeta.descricao);
      setValue("cep", pontoColeta.cep);
      setValue("logradouro", pontoColeta.logradouro);
      setValue("numero", pontoColeta.numero);
      setValue("bairro", pontoColeta.bairro);
      setValue("localidade", pontoColeta.localidade);
      setValue("uf", pontoColeta.uf);
      setValue("latitude", pontoColeta.lat);
      setValue("longitude", pontoColeta.lon);
      // Transformar a string de tipos_residuo em um array ao carregar o pontoColeta
      const tiposResiduo = pontoColeta.tipos_residuo
        ? pontoColeta.tipos_residuo.includes(",")
          ? pontoColeta.tipos_residuo.split(",")
          : [pontoColeta.tipos_residuo]
        : [];
      setValue("tipos_residuo", tiposResiduo);
      setSelectedResiduos(tiposResiduo);
      // Monta o link do Google Maps ao editar
      if (pontoColeta.lat && pontoColeta.lon) {
        setLinkMaps(
          `https://www.google.com/maps?q=${pontoColeta.lat},${pontoColeta.lon}`
        );
      }
    } else {
      setIsEditMode(false);
      setSelectedResiduos([]);
      setLinkMaps(""); // Limpa o link ao iniciar o cadastro
      // Limpar os campos do formulário
      setValue("nome", "");
      setValue("descricao", "");
      setValue("cep", "");
      setValue("logradouro", "");
      setValue("numero", "");
      setValue("bairro", "");
      setValue("localidade", "");
      setValue("uf", "");
      setValue("latitude", "");
      setValue("longitude", "");
      setValue("tipos_residuo", []);
    }
  }, [pontoColeta, setValue]);

  const buscarEnderecoPorCep = async () => {
    const cep = getValues("cep");
    try {
      const response = await ViaCepService.Get(cep);
      if (response) {
        setValue("logradouro", response.logradouro);
        setValue("bairro", response.bairro);
        setValue("uf", response.uf);
        setValue("localidade", response.localidade);

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
    const logradouro = getValues("logradouro");
    const bairro = getValues("bairro");
    const localidade = getValues("localidade");
    const uf = getValues("uf");
    const enderecoCompleto = `${logradouro}, ${bairro}, ${localidade}, ${uf}, Brasil`;

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

        // Aguardar 1 segundo antes de montar o link do Google Maps
        setTimeout(() => {
          setLinkMaps(`https://www.google.com/maps?q=${lat},${lon}`);
        }, 1000);
      }
    } catch (error) {
      console.error("Erro ao buscar coordenadas no Nominatim: ", error);
    }
  };

  const handleCepBlur = () => {
    buscarEnderecoPorCep();
  };

  const onSubmit = (data) => {
    // Transformar o array de tipos_residuo em uma string separada por vírgulas
    const tiposResiduoString = selectedResiduos.join(",");

    const novoPontoColeta = {
      nome: data.nome,
      descricao: data.descricao,
      usuario_id: usuarioLogado.id,
      cep: data.cep,
      logradouro: data.logradouro,
      numero: data.numero,
      bairro: data.bairro,
      localidade: data.localidade,
      uf: data.uf,
      lat: Number(data.latitude),
      lon: Number(data.longitude),
      tipos_residuo: tiposResiduoString
    };

    if (isEditMode) {
      editarPontoColeta(novoPontoColeta, pontoColeta.id);
    } else {
      cadastrarPontoColeta(novoPontoColeta);
    }
    navigate("/");
  };

  return (
    <Box
      component="form"
      sx={{ display: "grid", gap: 1 }}
      onSubmit={handleSubmit(onSubmit)}>
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
              id="tipos_residuo"
              multiple
              value={selectedResiduos}
              onChange={(event) => {
                const value = event.target.value;
                setSelectedResiduos(value);
                setValue("tipos_residuo", value);
              }}
              renderValue={(selected) => selected.join(", ")}
              error={!!errors.tipos_residuo}>
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
              required: "A descrição é obrigatória"
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
            register={register("cep", {
              required: "O cep é obrigatório",
              onBlur: handleCepBlur
            })}
            error={!!errors.cep}
            helperText={errors.cep?.message}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            id="logradouro"
            label="Logradouro"
            type="text"
            register={register("logradouro", {
              required: "O logradouro é obrigatório"
            })}
            error={!!errors.logradouro}
            helperText={errors.logradouro?.message}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Input
            id="numero"
            label="Número"
            type="text"
            register={register("numero", {
              required: "O número é obrigatório"
            })}
            error={!!errors.numero}
            helperText={errors.numero?.message}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Input
            id="bairro"
            label="Bairro"
            type="text"
            register={register("bairro", {
              required: "O bairro é obrigatório"
            })}
            error={!!errors.bairro}
            helperText={errors.bairro?.message}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <Input
            id="localidade"
            label="Cidade"
            type="text"
            register={register("localidade", {
              required: "A cidade é obrigatória"
            })}
            error={!!errors.localidade}
            helperText={errors.localidade?.message}
            InputLabelProps={{ shrink: true }}
          />{" "}
        </Grid>{" "}
        <Grid item xs={12} sm={3}>
          {" "}
          <Input
            id="uf"
            label="Estado"
            type="text"
            register={register("uf", {
              required: "O estado é obrigatório"
            })}
            error={!!errors.uf}
            helperText={errors.uf?.message}
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
              required: "A latitude é obrigatória"
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
              required: "A longitude é obrigatória"
            })}
            error={!!errors.longitude}
            helperText={errors.longitude?.message}
            InputLabelProps={{ shrink: true }}
          />{" "}
        </Grid>{" "}
        <Grid item xs={12}>
          <Typography variant="body1">
            {linkMaps ? (
              <a href={linkMaps} target="_blank" rel="noopener noreferrer">
                Abrir no Google Maps
              </a>
            ) : (
              "Aguarde para gerar o link do Google Maps após preencher o endereço."
            )}
          </Typography>
        </Grid>
      </Grid>{" "}
      <Button variant="contained" type="submit" color="primary">
        {" "}
        {isEditMode ? "Editar" : "Cadastrar"}{" "}
      </Button>{" "}
    </Box>
  );
}

export default FormCadastroColeta;
