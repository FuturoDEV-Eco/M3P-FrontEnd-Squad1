import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  Toolbar,
  Typography
} from "@mui/material";
import NavListDrawer from "./NavListDrawer";
import { useState, useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink, useNavigate } from "react-router-dom";
import { UsuariosContext } from "../../contexts/Usuarios/UsuariosContext";

function Navbar({ navArrayLinks }) {
  const [open, setOpen] = useState(false);
  const usuarioLogado = JSON.parse(
    sessionStorage.getItem("@Auth:user").toString()
  );
  const { logout } = useContext(UsuariosContext);
  const primeiroNome = usuarioLogado.nome.split(" ")[0];

  const navigate = useNavigate();

  function handleLogOut() {
    logout();
    navigate("/login");
  }
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => setOpen(true)}
            sx={{ display: { xs: "flex", sm: "none" } }}
            edge="start">
            <MenuIcon />
          </IconButton>
          <Typography sx={{ flexGrow: 1 }}>
            Bem vindo(a), {primeiroNome}
          </Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navArrayLinks.map((item) =>
              item.title !== "Sair" ? (
                <Button
                  color="inherit"
                  key={item.title}
                  component={NavLink}
                  to={item.path}>
                  {item.title}
                </Button>
              ) : (
                <Button
                  color="inherit"
                  key={item.title}
                  onClick={() => handleLogOut()}>
                  {item.title}
                </Button>
              )
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        open={open}
        anchor="left"
        onClose={() => setOpen(false)}
        sx={{ display: { xs: "flex", sm: "none" } }}>
        <NavListDrawer
          navArrayLinks={navArrayLinks}
          NavLink={NavLink}
          setOpen={setOpen}
        />
      </Drawer>
    </>
  );
}

export default Navbar;
