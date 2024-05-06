import { Card, Container, Typography } from "@mui/material";
import FormLogin from "../../components/FormLogin";
function PaginaLogin() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100%"
      }}>
      <Card sx={{ padding: 2 }} elevation={10}>
        <Typography
          variant="h3"
          component="h1"
          align="center"
          color="primary"
          gutterBottom>
          Login
        </Typography>
        <FormLogin />
      </Card>
    </Container>
  );
}

export default PaginaLogin;
