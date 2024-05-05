import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const UsuariosContext = createContext();

export const UsuariosContextProvider = ({ children }) => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    getUsuarios();
  }, []);

  function getUsuarios() {
    fetch("http://localhost:3000/usuarios")
      .then((response) => response.json())
      .then((dados) => setUsuarios(dados))
      .catch((error) => {
        console.error(error);
        toast.error("Erro ao buscar usuarios!", {
          position: "top-right",
          autoClose: 5000,
          theme: "colored"
        });
      });
  }

  function cadastrarUsuario(usuario) {
    if (usuario) {
      fetch(`http://localhost:3000/usuarios?cpf=${usuario.cpf}`)
        .then((res) => res.json())
        .then((usuarioExistente) => {
          // Se não existir usuário com o mesmo CPF, cadastrar
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
        });
    } else {
      toast.error("Dados do usuário inválidos", {
        position: "top-right",
        autoClose: 5000,
        theme: "colored"
      });
    }
  }

  function deletarUsuario(id) {
    fetch(`http://localhost:3000/locaisColeta?usuarioId=${id}`)
      .then((res) => res.json())
      .then((pontosColeta) => {
        // Se não houver pontos de coleta vinculados ao usuário, então deletar o usuário
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
      });
  }

  async function login(email, senha) {
    try {
      const response = await fetch("http://localhost:3000/usuarios");
      const dados = await response.json();

      let usuarioExiste = false;

      dados.map((usuario) => {
        if (usuario.email === email) {
          usuarioExiste = true;
          if (usuario.senha === senha) {
            localStorage.setItem("isAutenticado", true);
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
      }
    } catch (error) {
      console.error("Erro na tentativa de login", error);
      toast.error("Erro na tentativa de login", {
        position: "top-right",
        autoClose: 5000,
        theme: "colored"
      });
    }
  }

  return (
    <UsuariosContext.Provider
      value={{
        usuarios,
        cadastrarUsuario,
        deletarUsuario,
        login
      }}>
      {children}
    </UsuariosContext.Provider>
  );
};
