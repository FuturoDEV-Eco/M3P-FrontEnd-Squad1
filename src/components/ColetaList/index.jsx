import { List, ListItem, ListItemText, Button } from "@mui/material";

const ColetaList = ({ pontosColeta }) => {
  return (
    <List>
      {pontosColeta.map((ponto) => (
        <ListItem key={ponto.id}>
          <ListItemText
            primary={ponto.nome}
            secondary={
              <>
                <b>Endereço:</b> {ponto.logradouro}, {ponto.numero},{" "}
                {ponto.bairro}, {ponto.localidade}, {ponto.uf}, CEP: {ponto.cep}
                <br />
                <b>Tipo de Resíduo:</b> {ponto.tipos_residuo}
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  href={`https://www.google.com/maps/search/?api=1&query=${ponto.lat},${ponto.lon}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginTop: "10px" }}>
                  Abrir no Maps
                </Button>
              </>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default ColetaList;
