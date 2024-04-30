import { createBrowserRouter } from "react-router-dom";
import PaginaLogin from "../pages/PaginaLogin";
import App from "../App";
import PrivateRoute from "./PrivateRoute";

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <PaginaLogin />
  },
  {
    path: "/usuario/cadastro",
    element: <h1>Cadastro de Usuário</h1>
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
        element: <h1>Dashboard</h1>
      }
    ]
  }
]);

export default routes;
