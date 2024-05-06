import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PontosColetaContext } from "../../contexts/PontosColeta/PontosColetaContext";
import { Box, Typography } from "@mui/material";
import PontoColetaCard from "../../components/PontoColetaCard";

function PaginaListaColeta() {
  const { pontosColeta, deletarLocalColeta, getPontosColeta } =
    useContext(PontosColetaContext);
  const navigate = useNavigate();

  function handleEdit(id) {
    navigate(`/coleta/cadastro/${id}`);
  }

  async function handleDelete(id) {
    await deletarLocalColeta(id);
    await getPontosColeta();
  }
  return (
    <>
      <Typography variant="h4">Lista Pontos de coleta</Typography>
      <Box sx={{ display: "grid", gap: 2, maxWidth: 1000, mt: 4, mx: "auto" }}>
        {pontosColeta.map((pontoColeta) => {
          return (
            <PontoColetaCard
              key={pontoColeta.id}
              pontoColeta={pontoColeta}
              zoom={13}
              scrollWheelZoom={false}
              onclickEditar={() => handleEdit(pontoColeta.id)}
              onclickDeletar={() => handleDelete(pontoColeta.id)}
            />
          );
        })}
      </Box>
    </>
  );
}

export default PaginaListaColeta;
