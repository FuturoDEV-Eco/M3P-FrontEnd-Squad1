import { List, ListItem, ListItemText, Card, CardContent } from "@mui/material";

const ColetaList = ({ pontosColeta }) => {
  return (
    <Card sx={{ marginTop: 4 }}>
      <CardContent>
        <List>
          {pontosColeta.map((ponto) => (
            <ListItem key={ponto.id}>
              <ListItemText
                primary={ponto.nome}
                secondary={`Endereço: ${ponto.endereco}`}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default ColetaList;
