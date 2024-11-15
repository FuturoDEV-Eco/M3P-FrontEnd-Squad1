import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Api } from "../../services/api";

export const PontosColetaContext = createContext();

export const PontosColetaContextProvider = ({ children }) => {
  const [pontosColeta, setPontosColeta] = useState([]);
  const token = sessionStorage.getItem("@Auth:token");
  useEffect(() => {
    getPontosColeta();
  }, []);

  function getPontosColeta() {
    Api.get("/locaisColeta", {
      headers: {
        Authorization: `${token}`
      }
    })
      .then((response) => setPontosColeta(response.data))
      .catch((error) => {
        console.error(error);
        toast.error("Erro ao buscar pontos de coleta!", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored"
        });
      });
    /* fetch("http://localhost:3000/locaisColeta")
      .then((response) => response.json())
      .then((dados) => {
        setPontosColeta(dados);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Erro ao buscar pontos de coleta!", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored"
        });
      }); */
  }

  function getPontoColetaPorId(id) {
    Api.get("/locaisColeta/" + id, {
      headers: {
        Authorization: `${token}`
      }
    })
      .then((response) => setPontosColeta(response.data))
      .catch((error) => {
        console.error(error);
        toast.error("Erro ao buscar ponto de coleta!", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored"
        });
      });
    /* fetch("http://localhost:3000/locaisColeta/" + id)
      .then((response) => response.json())
      .then((dados) => setPontosColeta(dados))
      .catch((error) => {
        console.error(error);
        toast.error("Erro ao buscar ponto de coleta!", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored"
        });
      }); */
  }

  function cadastrarPontoColeta(novoPontoColeta) {
    Api.post("/locaisColeta", novoPontoColeta, {
      headers: {
        Authorization: `${token}`
      }
    })
      .then(() => {
        toast.success("Ponto de coleta cadastrado com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored"
        });
        getPontosColeta();
      })
      .catch((error) => {
        console.error("Erro ao cadastrar ponto de coleta", error);
        toast.error("Erro ao cadastrar ponto de coleta", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored"
        });
      });
    /* fetch("http://localhost:3000/locaisColeta", {
      method: "POST",
      body: JSON.stringify(novoPontoColeta),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        toast.success("Ponto de coleta cadastrado com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored"
        });
        getPontosColeta();
      })
      .catch((error) => {
        console.error("Erro ao cadastrar ponto de coleta", error);
        toast.error("Erro ao cadastrar ponto de coleta", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored"
        });
      }); */
  }

  function editarPontoColeta(pontoColeta, id) {
    Api.put("/locaisColeta/" + id, pontoColeta, {
      headers: {
        Authorization: `${token}`
      }
    })
      .then(() => {
        toast.success("Ponto de coleta editado com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored"
        });
        getPontosColeta();
      })
      .catch((error) => {
        console.error("Erro ao editar ponto de coleta", error);
        toast.error("Erro ao editar ponto de coleta", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored"
        });
      });
    /* fetch("http://localhost:3000/locaisColeta/" + id, {
      method: "PUT",
      body: JSON.stringify(pontoColeta),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(() => {
        toast.success("Ponto de coleta editado com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored"
        });
        getPontosColeta();
      })
      .catch((error) => {
        console.error("Erro ao editar ponto de coleta", error);
        toast.error("Erro ao editar ponto de coleta", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored"
        });
      }); */
  }

  function deletarLocalColeta(id) {
    Api.delete("/locaisColeta/" + id, {
      headers: {
        Authorization: `${token}`
      }
    })
      .then(() => {
        toast.success("Ponto de coleta deletado com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored"
        });
        getPontosColeta();
      })
      .catch((error) => {
        console.error("Erro ao deletar ponto de coleta", error);
        toast.error("Erro ao deletar um ponto de coleta", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored"
        });
      });
    /* fetch("http://localhost:3000/locaisColeta/" + id, {
      method: "DELETE"
    })
      .then(() => {
        toast.success("Ponto de coleta deletado com sucesso!", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored"
        });
      })
      .catch((error) => {
        console.error("Erro ao deletar ponto de coleta", error);
        toast.error("Erro ao deletar um ponto de coleta", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored"
        });
      }); */
  }

  return (
    <PontosColetaContext.Provider
      value={{
        pontosColeta,
        getPontosColeta,
        getPontoColetaPorId,
        cadastrarPontoColeta,
        editarPontoColeta,
        deletarLocalColeta
      }}>
      {children}
    </PontosColetaContext.Provider>
  );
};
