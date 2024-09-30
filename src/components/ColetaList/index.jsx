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
                <b>Endereço:</b> {ponto.localizacao.logradouro}, {ponto.localizacao.numero}, {ponto.localizacao.bairro}, {ponto.localizacao.cidade}, {ponto.localizacao.estado}, CEP: {ponto.localizacao.cep}
                <br />
                <b>Tipo de Resíduo:</b> {ponto.tipoResiduo}
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  href={`https://www.google.com/maps/search/?api=1&query=${ponto.latitude},${ponto.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ marginTop: "10px" }}
                >
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
