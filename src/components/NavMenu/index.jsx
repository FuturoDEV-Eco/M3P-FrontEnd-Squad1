import { useState } from "react";
import PropTypes from "prop-types"; // Importe a biblioteca PropTypes
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";

function NavMenu({ navArrayLinks }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            size="large"
            onClick={() => setOpen(true)}
            sx={{ display: { xs: "flex", sm: "none" } }}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <Typography sx={{ flexGrow: 1 }}>Recicla 365</Typography>

          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navArrayLinks.map((item) => (
              <Button
                color="inherit"
                key={item.title}
                component={NavLink}
                to={item.path}
              >
                {item.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        open={open}
        anchor="left"
        onClose={() => setOpen(false)}
        sx={{ display: { xs: "flex", sm: "none" } }}
      >
        <Box sx={{ width: 250 }}>
          {navArrayLinks.map((item) => (
            <Button
              key={item.title}
              component={NavLink}
              to={item.path}
              onClick={() => setOpen(false)}
            >
              {item.title}
            </Button>
          ))}
        </Box>
      </Drawer>
    </>
  );
}

// Adicione a validação de props
NavMenu.propTypes = {
  navArrayLinks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default NavMenu;
