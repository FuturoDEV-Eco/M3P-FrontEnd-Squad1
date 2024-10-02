import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PontosColetaContext } from "../../contexts/PontosColeta/PontosColetaContext";
import { UsuariosContext } from "../../contexts/Usuarios/UsuariosContext";
import { Box, Typography, CircularProgress } from "@mui/material";
import PontoColetaCard from "../../components/PontoColetaCard";

function PaginaListaColeta() {
  const { pontosColeta, deletarLocalColeta, getPontosColeta } = useContext(PontosColetaContext);
  const { isOwner } = useContext(UsuariosContext); // Função que verifica se o usuário é o dono
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
    await getPontosColeta(); // Atualiza a lista de pontos após a exclusão
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
        {pontosColeta.map((pontoColeta) => (
          <PontoColetaCard
            key={pontoColeta.id}
            pontoColeta={pontoColeta}
            zoom={13}
            scrollWheelZoom={false}
            onclickEditar={() => handleEdit(pontoColeta.id)}
            onclickDeletar={() => handleDelete(pontoColeta.id)}
            isOwner={isOwner(pontoColeta)} // Passa a verificação de propriedade
          />
        ))}
      </Box>
    </>
  );
}

export default PaginaListaColeta;
