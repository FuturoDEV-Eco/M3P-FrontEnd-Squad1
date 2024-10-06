import { Typography } from "@mui/material";
import FormCadastroColeta from "../../components/FormCadastroColeta";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Api } from "../../services/api";

function PaginaCadastroColeta() {
  const { id } = useParams();
  const [pontoColeta, setPontoColeta] = useState({});

  useEffect(() => {
    if (id) {
      Api.get("/locaisColeta/" + id)
        .then((response) => setPontoColeta(response.data))
        .catch((error) => {
          console.error(error);
          toast.error("Erro ao buscar ponto de coleta!", {
            position: "top-right",
            autoClose: 5000,
            theme: "colored"
          });
        });
      /* fetch("http://localhost:3000/locaisColeta/" + id)
        .then((response) => response.json())
        .then((dados) => {
          setPontoColeta(dados);
        })
        .catch((error) => {
          console.error(error);
          toast.error("Erro ao buscar ponto de coleta!", {
            position: "top-right",
            autoClose: 5000,
            theme: "colored"
          });
        }); */
    }
  }, [id]);

  return (
    <>
      <Typography variant="h4" sx={{ mb: { xs: 1, md: 3 } }}>
        Cadastro Pontos de Coleta {id ? " - Editar" : ""}
      </Typography>
      <FormCadastroColeta pontoColeta={pontoColeta} />
    </>
  );
}

export default PaginaCadastroColeta;
