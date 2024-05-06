import { createBrowserRouter } from "react-router-dom";
import PaginaLogin from "../pages/PaginaLogin";
import App from "../App";
import PrivateRoute from "./PrivateRoute";
import PaginaCadastroUsuario from "../pages/PaginaCadastroUsuario";
import PaginaHome from "../pages/PaginaHome";
import PaginaListaColeta from "../pages/PaginaListaColeta";
import PaginaCadastroColeta from "../pages/PaginaCadastroColeta";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <PaginaLogin />
  },
  {
    path: "/usuario/cadastro",
    element: <PaginaCadastroUsuario />
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <PaginaHome />
      },
      {
        path: "/coleta/lista",
        element: <PaginaListaColeta />
      },
      {
        path: "/coleta/cadastro",
        element: <PaginaCadastroColeta />
      },
      {
        path: "/coleta/cadastro/:id",
        element: <PaginaCadastroColeta />
      }
    ]
  }
]);

export default routes;
