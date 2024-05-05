import { createBrowserRouter } from "react-router-dom";
import PaginaLogin from "../pages/PaginaLogin";
import App from "../App";
import PrivateRoute from "./PrivateRoute";
import PaginaCadastroUsuario from "../pages/PaginaCadastroUsuario";
import PaginaHome from "../pages/PaginaHome";

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
      }
    ]
  }
]);

export default routes;
