import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PontosColetaContext } from "../../contexts/PontosColeta/PontosColetaContext";
import { UsuariosContext } from "../../contexts/Usuarios/UsuariosContext"; // Usa o UsuariosContext agora
import { Box, Typography, CircularProgress } from "@mui/material";
import PontoColetaCard from "../../components/PontoColetaCard";

function PaginaListaColeta() {
  const { pontosColeta, deletarLocalColeta, getPontosColeta } = useContext(PontosColetaContext);
  const { isOwner } = useContext(UsuariosContext); // Pega a função isOwner do UsuariosContext
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      await getPontosColeta();
      setLoading(false);
    }
    fetchData();
  }, [getPontosColeta]);

  function handleEdit(id) {
    navigate(`/coleta/cadastro/${id}`);
  }

  async function handleDelete(id) {
    setLoading(true);
    await deletarLocalColeta(id);
    await getPontosColeta();
    setLoading(false);
  }

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
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
              onclickEditar={isOwner(pontoColeta) ? () => handleEdit(pontoColeta.id) : undefined}
              onclickExcluir={isOwner(pontoColeta) ? () => handleDelete(pontoColeta.id) : undefined}
            />
          );
        })}
      </Box>
    </>
  );
}

export default PaginaListaColeta;
