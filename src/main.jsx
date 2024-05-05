import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import routes from "./router/routes.jsx";
import { UsuariosContextProvider } from "./contexts/Usuarios/UsuariosContext.jsx";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#127f18"
    },
    secondary: {
      main: "#ff6d00"
    }
  }
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <UsuariosContextProvider>
        <RouterProvider router={routes} />
      </UsuariosContextProvider>
    </LocalizationProvider>
  </ThemeProvider>
);
