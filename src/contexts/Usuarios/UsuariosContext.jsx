import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Api } from "../../services/api";

export const UsuariosContext = createContext();

export const UsuariosContextProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState(null); // Armazena o usuário logado

  useEffect(() => {
    if (isAuthenticated()) {
      getUsuarios();
    }
    const user = localStorage.getItem("@Auth:user"); // Recupera o usuário logado do localStorage
    const tokenSalvo = localStorage.getItem("@Auth:token");
    if (user && tokenSalvo) {
      setUsuarioLogado(JSON.parse(user));
    }
    /* getUsuarios();
    const user = localStorage.getItem("user"); // Recupera o usuário logado do localStorage
    if (user) {
      setUsuarioLogado(JSON.parse(user));
    } */
  }, []);

  // Função para verificar se o usuário está logado
  function isAuthenticated() {
    return !!usuarioLogado;
  }

  // Verifica se o usuário logado é o dono do ponto de coleta
  function isOwner(pontoColeta) {
    // Certifica-se de que os objetos `usuarioLogado` e `pontoColeta` existem e têm o campo `id` necessário
    return (
      usuarioLogado && pontoColeta && pontoColeta.usuarioId === usuarioLogado.id
    );
  }

  function getUsuarios() {
    Api.get("/usuarios")
      .then((response) => {
        console.log(response.data);
        setUsuarios(response.data);
      })
      .catch((error) => {
        console.error(error);
        toast.error("Erro ao buscar usuarios!", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored"
        });
      });
    /* fetch("http://localhost:3000/usuarios")
      .then((response) => response.json())
      .then((dados) => setUsuarios(dados))
      .catch((error) => {
        console.error(error);
        toast.error("Erro ao buscar usuarios!", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored"
        });
      }); */
  }

  function cadastrarUsuario(usuario) {
    if (usuario) {
      Api.post("/usuarios", usuario)
        .then(() => {
          toast.success("Usuário cadastrado com sucesso!", {
            position: "top-right",
            autoClose: 5000,
            theme: "colored"
          });
          getUsuarios();
        })
        .catch((error) => {
          console.error("Erro ao cadastrar usuário", error);
          toast.error("Erro ao cadastrar usuário!", {
            position: "top-right",
            autoClose: 5000,
            theme: "colored"
          });
        });
      /* fetch(`http://localhost:3000/usuarios?cpf=${usuario.cpf}`)
        .then((res) => res.json())
        .then((usuarioExistente) => {
          if (!usuarioExistente.length) {
            fetch("http://localhost:3000/usuarios", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(usuario)
            })
              .then(() => {
                toast.success("Usuário cadastrado com sucesso!", {
                  position: "top-right",
                  autoClose: 5000,
                  theme: "colored"
                });
                getUsuarios();
              })
              .catch((error) => {
                console.error("Erro ao cadastrar usuário", error);
                toast.error("Erro ao cadastrar usuário!", {
                  position: "top-right",
                  autoClose: 5000,
                  theme: "colored"
                });
              });
          } else {
            toast.error("Usuário com este CPF já está cadastrado", {
              position: "top-right",
              autoClose: 5000,
              theme: "colored"
            });
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar usuários", error);
          toast.error("Erro ao buscar usuários", {
            position: "top-right",
            autoClose: 5000,
            theme: "colored"
          });
        }); */
    } else {
      toast.error("Dados do usuário inválidos", {
        position: "top-right",
        autoClose: 5000,
        theme: "colored"
      });
    }
  }

  function deletarUsuario(id) {
    Api.get(`/locaisColeta?usuarioId=${id}`)
      .then((res) => {
        if (!res.data.length) {
          Api.delete(`/usuarios/${id}`)
            .then(() => {
              toast.success("Usuário deletado com sucesso", {
                position: "top-right",
                autoClose: 5000,
                theme: "colored"
              });
              getUsuarios();
            })
            .catch((error) => {
              console.error("Erro ao deletar usuário", error);
              toast.error("Erro ao deletar usuário", {
                position: "top-right",
                autoClose: 5000,
                theme: "colored"
              });
            });
        } else {
          toast.error(
            "Usuário possui pontos de coleta vinculados e não pode ser deletado",
            {
              position: "top-right",
              autoClose: 5000,
              theme: "colored"
            }
          );
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar pontos de coleta", error);
        toast.error("Erro ao buscar pontos de coleta", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored"
        });
      });
    /* fetch(`http://localhost:3000/locaisColeta?usuarioId=${id}`)
      .then((res) => res.json())
      .then((pontosColeta) => {
        if (!pontosColeta.length) {
          fetch(`http://localhost:3000/usuarios/${id}`, {
            method: "DELETE"
          })
            .then(() => {
              toast.success("Usuário deletado com sucesso", {
                position: "top-right",
                autoClose: 5000,
                theme: "colored"
              });
              getUsuarios();
            })
            .catch((error) => {
              console.error("Erro ao deletar usuário", error);
              toast.error("Erro ao deletar usuário", {
                position: "top-right",
                autoClose: 5000,
                theme: "colored"
              });
            });
        } else {
          toast.error(
            "Usuário possui pontos de coleta vinculados e não pode ser deletado",
            {
              position: "top-right",
              autoClose: 5000,
              theme: "colored"
            }
          );
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar pontos de coleta", error);
        toast.error("Erro ao buscar pontos de coleta", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored"
        });
      }); */
  }

  async function login(email, password) {
    try {
      const response = await Api.post("/usuarios/login", { email, password });
      const token = response.data.token;
      const usuario = {
        id: response.data.id,
        nome: response.data.nome,
        email: response.data.email
      };
      localStorage.setItem("@Auth:token", token);
      localStorage.setItem("@Auth:user", JSON.stringify(usuario));
      setUsuarioLogado(usuario);
      localStorage.setItem("isAutenticado", true);
      toast.success("Usuário logado com sucesso", {
        position: "top-right",
        autoClose: 5000,
        theme: "colored"
      });
      window.location.href = "/";

      /* const response = await fetch("http://localhost:3000/usuarios");
      const dados = await response.json();

      let usuarioExiste = false;

      dados.map((usuario) => {
        if (usuario.email === email) {
          usuarioExiste = true;
          if (usuario.senha === senha) {
            const usuarioLogado = {
              id: usuario.id,
              nome: usuario.nome
            };
            localStorage.setItem("isAutenticado", true);
            localStorage.setItem("user", JSON.stringify(usuarioLogado));
            setUsuarioLogado(usuarioLogado); // Armazena o usuário logado no estado
            toast.success("Usuário logado com sucesso", {
              position: "top-right",
              autoClose: 5000,
              theme: "colored"
            });
            window.location.href = "/";
            return;
          }
          toast.error("Senha incorreta", {
            position: "top-right",
            autoClose: 5000,
            theme: "colored"
          });
          return;
        }
      });
      if (!usuarioExiste) {
        toast.error("Não existe usuário com este email", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored"
        });
      } */
    } catch (error) {
      console.error("Erro na tentativa de login", error);
      toast.error("Erro na tentativa de login", {
        position: "top-right",
        autoClose: 5000,
        theme: "colored"
      });
    }
  }
  const logout = async () => {
    setUsuarios(null);
    Api.defaults.headers.common["Authorization"] = undefined;
    localStorage.removeItem("@Auth:token");
    localStorage.removeItem("@Auth:user");
    localStorage.removeItem("isAutenticado");
  };

  return (
    <UsuariosContext.Provider
      value={{
        usuarios,
        cadastrarUsuario,
        deletarUsuario,
        login,
        logout,
        isAuthenticated,
        isOwner, // Adiciona as funções de autenticação e propriedade
        usuarioLogado // Exporta o usuário logado
      }}>
      {children}
    </UsuariosContext.Provider>
  );
};
