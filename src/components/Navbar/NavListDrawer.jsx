import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import { useNavigate } from "react-router-dom";

function NavListDrawer({ navArrayLinks, NavLink, setOpen }) {
  const navigate = useNavigate();
  function handleLogOut() {
    sessionStorage.clear();
    navigate("/login");
  }
  return (
    <Box sx={{ width: 250 }}>
      <nav>
        <List>
          {navArrayLinks.map((item) => (
            <ListItem disablePadding key={item.title}>
              {item.title !== "Sair" ? (
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  onClick={() => setOpen(false)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText>{item.title}</ListItemText>
                </ListItemButton>
              ) : (
                <ListItemButton onClick={() => handleLogOut()}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText>{item.title}</ListItemText>
                </ListItemButton>
              )}
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
}

export default NavListDrawer;
